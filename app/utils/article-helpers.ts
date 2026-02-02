export function mapArticleCategory(article: any) {
  if (!article) return null;

  return {
    ...article,
    category: article.category?.category || article.category,
  };
}

export function mapArticlesWithCategory(articles: any[] | null) {
  return (articles || []).map(mapArticleCategory);
}

export const ARTICLE_WITH_CATEGORY_QUERY =
  "*, category:article_categorys(category)";
