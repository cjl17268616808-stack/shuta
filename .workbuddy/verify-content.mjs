/* 数塔内容校验器：把 .workbuddy/content-spec.md 里的红线逐条跑一遍
   用法：node .workbuddy/verify-content.mjs   （先跑 python_src/build_data.py）
   只想看某几章：node .workbuddy/verify-content.mjs 5 6                */
import fs from 'node:fs';
import vm from 'node:vm';

const ROOT = 'E:/XM/shuta';
const args = process.argv.slice(2);
const jsonIdx = args.indexOf('--json');
const jsonPath = jsonIdx >= 0 ? args[jsonIdx + 1] : '';
const only = args.filter((a, i) => i !== jsonIdx && i !== jsonIdx + 1).map(Number).filter(n => !isNaN(n));

const errors = [], warns = [], stats = [];

// ---- 载入数据 ----
const sandbox = { window: {}, console: { log() {}, warn() {} } };
sandbox.window = sandbox;
vm.createContext(sandbox);
let data;
if (jsonPath) {
    // 单章模式：python .workbuddy/dump-chapter.py 5 会生成 .workbuddy/_chapter5.json
    const raw = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    data = raw.chapters ? raw : { chapters: [raw] };
    console.log('（单章校验：' + jsonPath + '）');
} else {
    data = vm.runInContext(fs.readFileSync(ROOT + '/js/data.js', 'utf8') + '\n;textbookData', sandbox, { filename: 'data.js' });
}

// ---- 引擎里已有的场景名 ----
const engine = fs.readFileSync(ROOT + '/js/comicEngine.js', 'utf8');
// 兼容两种写法：scatter: `<svg  与  'table-anatomy': `<svg（带连字符的场景名必须加引号）
const scenes = new Set([...engine.matchAll(/^ {8}['"]?([A-Za-z_][\w-]*)['"]?:\s*`<svg/gm)].map(m => m[1]));

const NEW_MODES = ['sequence', 'match', 'fill', 'toggle', 'flip', 'find', 'branch', 'sort', 'judge', 'challenge', 'input', 'describe'];
const EMOTIONS = ['normal', 'happy', 'confused'];
const CLASSES = ['scattered-item', 'organized-item', 'table-header-item', 'table-row-item', 'pk-item', 'fk-item', 'crud-item', 'magic-effect', 'log-item', 'ai-tool-item', 'ref-item'];
const isArr = (x, n) => Array.isArray(x) && x.length >= n;

function checkPanel(kpId, p, i) {
    const at = kpId + ' 第' + (i + 1) + '分镜';
    if (p.id !== i + 1) errors.push(at + '：id 不是 ' + (i + 1));
    if (!p.taku || !p.taku.dialogue) errors.push(at + '：缺 taku.dialogue');
    else if (p.taku.emotion && !EMOTIONS.includes(p.taku.emotion)) errors.push(at + '：emotion 非法 ' + p.taku.emotion);
    if (p.scene && !scenes.has(p.scene)) errors.push(at + '：场景 "' + p.scene + '" 在 comicEngine.comicScenes 里不存在');
    (p.stage || []).forEach((s, k) => {
        if (s.className && !CLASSES.includes(s.className)) errors.push(at + ' stage[' + k + ']：className 非法 ' + s.className);
    });
    const it = p.interaction;
    if (!it) return;
    const t = it.type;
    if (!it.type) { errors.push(at + '：interaction 缺 type'); return; }
    switch (t) {
        case 'click': if (!it.text) errors.push(at + '：click 缺 text'); break;
        case 'click-object': if (!it.targetClass || !it.text) errors.push(at + '：click-object 缺 targetClass/text'); break;
        case 'quiz':
            if (!it.question || !isArr(it.options, 2)) errors.push(at + '：quiz 缺 question/options');
            else if (!(Number.isInteger(it.answer) && it.answer >= 0 && it.answer < it.options.length)) errors.push(at + '：quiz answer 越界');
            break;
        case 'sequence':
            if (!isArr(it.steps, 3)) errors.push(at + '：sequence 需要 ≥3 个 steps');
            if (!it.question) errors.push(at + '：sequence 缺 question');
            break;
        case 'match':
            if (!isArr(it.pairs, 3)) errors.push(at + '：match 需要 ≥3 组 pairs');
            else it.pairs.forEach((pr, k) => { if (!Array.isArray(pr) || pr.length !== 2) errors.push(at + '：pairs[' + k + '] 不是 [左,右]'); });
            if (!it.question) errors.push(at + '：match 缺 question');
            break;
        case 'fill': {
            if (!Array.isArray(it.sentence)) { errors.push(at + '：fill 缺 sentence'); break; }
            const blanks = it.sentence.filter(s => /^\{\d+\}$/.test(s)).length;
            if (!blanks) errors.push(at + '：fill 的 sentence 里没有 {0} 这类空格');
            if (!isArr(it.options, blanks)) errors.push(at + '：fill 的 options 少于空格数（' + blanks + '）');
            if (!isArr(it.answers, blanks)) errors.push(at + '：fill 的 answers 数量(' + (it.answers || []).length + ') 与空格数(' + blanks + ') 不一致');
            else it.answers.forEach(a => { if (!it.options.includes(a)) errors.push(at + '：fill 的答案 "' + a + '" 不在 options 里'); });
            if (!it.question) errors.push(at + '：fill 缺 question');
            break;
        }
        case 'toggle':
            if (!isArr(it.states, 2) || it.states.length !== 2) errors.push(at + '：toggle 必须是 2 个 states');
            else it.states.forEach((s, k) => { if (!s.label || !s.metric || !s.time || !s.note) errors.push(at + '：states[' + k + '] 缺 label/metric/time/note'); });
            if (!it.question) errors.push(at + '：toggle 缺 question');
            break;
        case 'flip':
            if (!isArr(it.cards, 3)) errors.push(at + '：flip 需要 ≥3 张 cards');
            else it.cards.forEach((c, k) => { if (!c.front || !c.back) errors.push(at + '：cards[' + k + '] 缺 front/back'); });
            if (!it.question) errors.push(at + '：flip 缺 question');
            break;
        case 'find': {
            if (!isArr(it.rows, 4)) errors.push(at + '：find 需要 ≥4 行');
            const hits = (it.rows || []).filter(r => r.hit).length;
            if (!hits) errors.push(at + '：find 至少要有一个 hit:true');
            if (hits === (it.rows || []).length) errors.push(at + '：find 不能所有行都有问题');
            (it.rows || []).forEach((r, k) => { if (!r.text) errors.push(at + '：rows[' + k + '] 缺 text'); });
            if (!it.question) errors.push(at + '：find 缺 question');
            break;
        }
        case 'branch': {
            if (!isArr(it.options, 2)) errors.push(at + '：branch 需要 ≥2 个选项');
            const good = (it.options || []).filter(o => o.tone === 'good').length;
            if (good !== 1) errors.push(at + '：branch 必须恰好有 1 个 tone="good"（现在 ' + good + ' 个）');
            (it.options || []).forEach((o, k) => { if (!o.label || !o.result) errors.push(at + '：options[' + k + '] 缺 label/result'); });
            if (!it.question) errors.push(at + '：branch 缺 question');
            break;
        }
        case 'sort': {
            if (!isArr(it.items, 3)) errors.push(at + '：sort 需要 ≥3 个 items');
            if (!isArr(it.buckets, 2)) errors.push(at + '：sort 需要 ≥2 个 buckets');
            if ((it.answers || []).length !== (it.items || []).length) errors.push(at + '：sort 的 answers 数量与 items 不一致');
            (it.answers || []).forEach(a => { if (!(a >= 0 && a < (it.buckets || []).length)) errors.push(at + '：sort answers 里有越界的筐下标 ' + a); });
            const used = new Set(it.answers || []);
            if (used.size < (it.buckets || []).length) warns.push(at + '：sort 有筐没被用到');
            if (!it.question) errors.push(at + '：sort 缺 question');
            break;
        }
        case 'judge': {
            if (!isArr(it.statements, 2)) errors.push(at + '：judge 需要 ≥2 条 statements');
            else it.statements.forEach((s, k) => {
                if (!s.text) errors.push(at + '：statements[' + k + '] 缺 text');
                if (typeof s.answer !== 'boolean') errors.push(at + '：statements[' + k + '] 缺 answer（true/false）');
                if (!s.why) errors.push(at + '：statements[' + k + '] 缺 why（判定后要讲清为什么）');
            });
            const answers = (it.statements || []).map(s => s.answer);
            if (answers.length && answers.every(a => a === true)) warns.push(at + '：judge 全部是对的，加一句错的说法更有辨析感');
            if (!it.question) errors.push(at + '：judge 缺 question');
            break;
        }
        case 'challenge': {
            if (!isArr(it.segments, 3)) errors.push(at + '：challenge 需要 ≥3 个 segments');
            const checks = (it.segments || []).filter(s => s.check);
            const wrongs = (it.segments || []).filter(s => s.wrong);
            if (checks.length < 2) errors.push(at + '：challenge 至少要 2 个 check:true 的可质疑段');
            if (wrongs.length !== 1) errors.push(at + '：challenge 必须恰好 1 处 wrong:true（现在 ' + wrongs.length + ' 处）');
            (it.segments || []).forEach((s, k) => {
                if (!s.text) errors.push(at + '：segments[' + k + '] 缺 text');
                if (s.check && !s.why) errors.push(at + '：segments[' + k + '] 是 check 段，必须写 why（对的说为何没错，错的说错在哪）');
                if (s.wrong && !s.check) errors.push(at + '：segments[' + k + '] wrong:true 必须同时 check:true');
            });
            if (!it.question) errors.push(at + '：challenge 缺 question');
            break;
        }
        case 'input':
            if (!isArr(it.accept, 1)) errors.push(at + '：input 需要 ≥1 个 accept 答案');
            else it.accept.forEach(a => { if (!String(a).trim()) errors.push(at + '：accept 里有空答案'); });
            if (!it.question) errors.push(at + '：input 缺 question');
            break;
        case 'describe':
            if (!it.prompt) errors.push(at + '：describe 缺 prompt');
            if (!it.reference) errors.push(at + '：describe 缺 reference（写完要给参考理解对照）');
            if (it.keywords && !isArr(it.keywords, 1)) errors.push(at + '：keywords 要么不写，要么 ≥1 个');
            break;
        default: errors.push(at + '：未知互动类型 ' + t);
    }
}

const combos = new Map();
for (const ch of data.chapters) {
    if (only.length && !only.includes(ch.id)) continue;
    if (!isArr(ch.knowledgePoints, 1)) { errors.push('第' + ch.id + '章没有知识点'); continue; }
    let prevCombo = '';
    for (const kp of ch.knowledgePoints) {
        const panels = kp.panels || [];
        const chars = JSON.stringify(kp).length;
        const modes = panels.map(p => (p.interaction && p.interaction.type) || 'plain');
        const newModes = [...new Set(modes.filter(m => NEW_MODES.includes(m)))];
        const combo = newModes.slice().sort().join('+') || '(无新模式)';
        if (panels.length < 5) warns.push(kp.id + '：只有 ' + panels.length + ' 个分镜（目标 ≥5）');
        if (chars < 3200) warns.push(kp.id + '：正文 ' + chars + " 字符（目标 ≥3200）");
        if (newModes.length < 2) errors.push(kp.id + '：只用了 ' + newModes.length + ' 种新互动模式（要求 ≥2），当前 [' + newModes.join(',') + ']');
        if (combo === prevCombo) warns.push(kp.id + '：模式组合与上一节完全相同（' + combo + '）');
        if (combos.has(combo)) warns.push(kp.id + '：模式组合与 ' + combos.get(combo) + ' 相同（' + combo + '）');
        else combos.set(combo, kp.id);
        prevCombo = combo;
        panels.forEach((p, i) => checkPanel(kp.id, p, i));
        if (!isArr(kp.reviewQuiz, 3)) errors.push(kp.id + '：复习题少于 3 题');
        (kp.reviewQuiz || []).forEach((q, i) => {
            if (!q.question || !isArr(q.options, 2)) errors.push(kp.id + ' 复习题' + (i + 1) + '：缺 question/options');
            else if (!(q.answer >= 0 && q.answer < q.options.length)) errors.push(kp.id + ' 复习题' + (i + 1) + '：answer 越界');
            if (!q.explanation) errors.push(kp.id + ' 复习题' + (i + 1) + '：缺 explanation');
        });
        stats.push(kp.id + ' ' + String(panels.length).padStart(2) + '分镜 ' + String(Math.round(chars / 100) / 10).padStart(5) + 'K [' + modes.join(' → ') + ']');
    }
}
console.log(stats.join('\n'));
console.log('\n=== 错误 ' + errors.length + ' 条 ===');
errors.forEach(e => console.log(' ✗ ' + e));
console.log('=== 警告 ' + warns.length + ' 条 ===');
warns.forEach(w => console.log(' ! ' + w));
process.exit(errors.length ? 1 : 0);
