import json
import os
import sys

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from chapters.chapter1 import CHAPTER_1_DATA
from chapters.chapter2 import CHAPTER_2_DATA
from chapters.chapter3 import CHAPTER_3_DATA
from chapters.chapter4 import CHAPTER_4_DATA
from chapters.chapter5 import CHAPTER_5_DATA
from chapters.chapter6 import CHAPTER_6_DATA
from chapters.special_ai_log import SPECIAL_AI_LOG

# ============================================================
# 🎬 演示开关：预置学习进度
# ============================================================
# 留空 []  → 全新体验，进度从 0 开始（默认）
# 填知识点ID → 打开就显示这些知识点已通关，适合演示"学习成果/进度"画面
#   例如 ["1-1", "1-2", "1-3"]        → 第1章前3节已完成
#   例如 ["1-1","1-2","1-3","1-4","1-5"] → 第1章整章通关
# 可用的知识点 ID：1-1 ~ 1-5、2-1 ~ 2-5、3-1 ~ 3-6、
#                  4-1 ~ 4-5、5-1 ~ 5-5、6-1 ~ 6-6（共 32 个）
DEMO_COMPLETED_KPS = []


def build_js():
    # 合并六章 + 特殊章节（AI 日志）
    textbook_data = {
        "projectName": CHAPTER_1_DATA["projectName"],
        "takuWelcome": CHAPTER_1_DATA["takuWelcome"],
        "takuIdle": CHAPTER_1_DATA["takuIdle"],
        "chapters": [
            CHAPTER_1_DATA["chapters"][0],
            CHAPTER_2_DATA,
            CHAPTER_3_DATA,
            CHAPTER_4_DATA,
            CHAPTER_5_DATA,
            CHAPTER_6_DATA,
        ],
        "specialChapter": SPECIAL_AI_LOG,
    }

    json_str = json.dumps(textbook_data, ensure_ascii=False, indent=2)

    js_content = f"""// =======================================================
// ⚠️ 此文件由 Python 自动生成，请勿直接修改！
// =======================================================

const textbookData = {json_str};
"""

    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    # 1) 输出 js/data.js（离线双击可用）
    output_js = os.path.join(root_dir, 'js', 'data.js')
    with open(output_js, 'w', encoding='utf-8') as f:
        f.write(js_content)

    # 2) 输出 data/textbook.json（部署到服务器时 fetch 用）
    data_dir = os.path.join(root_dir, 'data')
    os.makedirs(data_dir, exist_ok=True)
    with open(os.path.join(data_dir, 'textbook.json'), 'w', encoding='utf-8') as f:
        json.dump(textbook_data, f, ensure_ascii=False, indent=2)

    # 3) 输出 js/progress-baseline.js（学习进度内嵌基线，清缓存不丢进度）
    #    说明：静态页面无法把自己写回磁盘，所以"进度存储"采用三层设计——
    #    ① 本文件提供页面内嵌基线（与浏览器缓存无关，永远在）；
    #    ② localStorage 记录本次学习增量；
    #    ③ 内存态兜底，缓存被禁用时不报错。
    total_kps = sum(len(c['knowledgePoints']) for c in textbook_data['chapters'])

    demo_ids = []
    all_ids = [kp['id'] for c in textbook_data['chapters'] for kp in c['knowledgePoints']]
    for kid in DEMO_COMPLETED_KPS:
        if kid not in all_ids:
            print(f"   ⚠️ 警告：DEMO_COMPLETED_KPS 里的 '{kid}' 不是有效知识点ID，已忽略")
        elif kid not in demo_ids:
            demo_ids.append(kid)

    baseline_js = f"""// =======================================================
//  ⚠️ 此文件由 Python 自动生成，请勿直接修改！
//  学习进度内嵌基线：清缓存 / 隐私模式 / 换浏览器后仍然生效。
//  要预置演示进度，请改 python_src/build_data.py 里的 DEMO_COMPLETED_KPS 后重新编译。
// =======================================================
window.SHUTA_PROGRESS_BASELINE = {{
    "total": {total_kps},
    "completedKps": {json.dumps(demo_ids, ensure_ascii=False)},
    "note": "内嵌基线进度：与浏览器缓存无关，清缓存不丢失。"
}};
"""
    with open(os.path.join(root_dir, 'js', 'progress-baseline.js'), 'w', encoding='utf-8') as f:
        f.write(baseline_js)

    filled_kps = sum(1 for c in textbook_data['chapters']
                     for kp in c['knowledgePoints'] if kp.get('panels'))
    print(f"✅ 编译成功！{len(textbook_data['chapters'])} 个章节，"
          f"共 {total_kps} 个知识点（已填充 {filled_kps} 个）。")
    print(f"   已输出：js/data.js、data/textbook.json、js/progress-baseline.js")

if __name__ == "__main__":
    build_js()
