// assets/content-map.js
const contentMap = {
  siteUrl: "https://webs-cjcp.com",
  siteName: "彩经网",
  sections: [
    {
      id: "home",
      title: "首页",
      keywords: ["彩经网", "首页", "资讯"],
      tags: ["首页推荐", "最新动态"],
      items: [
        { slug: "welcome", label: "欢迎来到彩经网", url: "https://webs-cjcp.com/welcome" },
        { slug: "trending", label: "热门内容", url: "https://webs-cjcp.com/trending" }
      ]
    },
    {
      id: "news",
      title: "新闻",
      keywords: ["彩经网", "新闻", "行业动态"],
      tags: ["财经", "彩票"],
      items: [
        { slug: "market-report", label: "市场报告", url: "https://webs-cjcp.com/news/market-report" },
        { slug: "policy-update", label: "政策更新", url: "https://webs-cjcp.com/news/policy-update" }
      ]
    },
    {
      id: "analysis",
      title: "分析",
      keywords: ["彩经网", "分析", "数据"],
      tags: ["趋势", "图表"],
      items: [
        { slug: "chart-analysis", label: "图表分析", url: "https://webs-cjcp.com/analysis/chart-analysis" },
        { slug: "data-insight", label: "数据洞察", url: "https://webs-cjcp.com/analysis/data-insight" }
      ]
    }
  ]
};

function searchContent(query, map = contentMap) {
  if (!query || query.trim() === "") return [];

  const lowerQuery = query.toLowerCase().trim();
  const results = [];

  for (const section of map.sections) {
    let sectionMatch = false;
    const matchedItems = [];

    if (section.title.toLowerCase().includes(lowerQuery)) {
      sectionMatch = true;
    }

    for (const keyword of section.keywords) {
      if (keyword.toLowerCase().includes(lowerQuery)) {
        sectionMatch = true;
        break;
      }
    }

    for (const tag of section.tags) {
      if (tag.toLowerCase().includes(lowerQuery)) {
        sectionMatch = true;
        break;
      }
    }

    for (const item of section.items) {
      if (
        item.label.toLowerCase().includes(lowerQuery) ||
        item.slug.toLowerCase().includes(lowerQuery)
      ) {
        matchedItems.push(item);
      }
    }

    if (sectionMatch || matchedItems.length > 0) {
      results.push({
        section: section.title,
        matchedItems: matchedItems.length > 0 ? matchedItems : section.items
      });
    }
  }

  return results;
}

function filterByTag(tag, map = contentMap) {
  if (!tag || tag.trim() === "") return [];

  const lowerTag = tag.toLowerCase().trim();
  const results = [];

  for (const section of map.sections) {
    const matchedItems = [];

    for (const item of section.items) {
      if (section.tags.some(t => t.toLowerCase().includes(lowerTag))) {
        matchedItems.push(item);
      }
    }

    if (matchedItems.length > 0) {
      results.push({
        section: section.title,
        items: matchedItems
      });
    }
  }

  return results;
}

function getSectionById(id, map = contentMap) {
  return map.sections.find(section => section.id === id) || null;
}

function getAllKeywords(map = contentMap) {
  const keywordsSet = new Set();
  for (const section of map.sections) {
    section.keywords.forEach(kw => keywordsSet.add(kw));
  }
  return Array.from(keywordsSet);
}

function getAllTags(map = contentMap) {
  const tagsSet = new Set();
  for (const section of map.sections) {
    section.tags.forEach(tag => tagsSet.add(tag));
  }
  return Array.from(tagsSet);
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    contentMap,
    searchContent,
    filterByTag,
    getSectionById,
    getAllKeywords,
    getAllTags
  };
}