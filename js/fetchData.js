/**
 * 获取数据模块
 * 直接用内置 data.js —— 沙盒 iframe / file:// / http 都不依赖网络，绝不卡住
 */
async function getTextbookData() {
    if (typeof textbookData !== 'undefined' && textbookData && textbookData.chapters) {
        console.log("✅ 使用内置 data.js 数据，章节数:", textbookData.chapters.length);
        return textbookData;
    }
    // 兜底：如果 data.js 没加载，尝试 fetch
    try {
        const r = await fetch('./data/textbook.json');
        return await r.json();
    } catch (e) {
        console.error("❌ 数据加载失败");
        return null;
    }
}