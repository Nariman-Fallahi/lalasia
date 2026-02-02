import LatestArticles from "~/components/article/latest-articles";
import HeroSlider from "~/components/article/hero-slider";
import TrendingTopics from "~/components/article/trending-topics";
import PageTitle from "~/ui/page-title";
import type { Route } from "./+types/article";
import { createClient } from "~/utils/supabase/client";
import { ARTICLE_INTRO } from "~/constants/intros";
import {
  ARTICLE_WITH_CATEGORY_QUERY,
  mapArticlesWithCategory,
} from "~/utils/article-helpers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Article" },
    { name: "description", content: "Lalasia Article Page" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const supabase = createClient();
  const categoryId = params?.categoryId;

  const [categoriesRes, heroRes, latestRes, trendingRes] = await Promise.all([
    supabase.from("article_categorys").select("*"),
    supabase.from("articles").select(ARTICLE_WITH_CATEGORY_QUERY).limit(2),
    supabase
      .from("articles")
      .select(ARTICLE_WITH_CATEGORY_QUERY)
      .order("created_at", { ascending: false })
      .limit(2),
    categoryId
      ? supabase
          .from("articles")
          .select(ARTICLE_WITH_CATEGORY_QUERY)
          .eq("category", Number(categoryId))
      : supabase.from("articles").select(ARTICLE_WITH_CATEGORY_QUERY),
  ]);

  return {
    categories: categoriesRes.data || [],
    heroSlides: mapArticlesWithCategory(heroRes.data),
    latestArticles: mapArticlesWithCategory(latestRes.data),
    trendingArticles: mapArticlesWithCategory(trendingRes.data),
  };
}

export default function Article({ loaderData }: Route.ComponentProps) {
  const { heroSlides, latestArticles, categories, trendingArticles } =
    loaderData;

  return (
    <div>
      <PageTitle
        title={ARTICLE_INTRO.header.title}
        description={ARTICLE_INTRO.header.description}
      />
      <HeroSlider articleHeroSliders={heroSlides || []} />
      <LatestArticles latestArticles={latestArticles} />
      <TrendingTopics
        articleCategorys={categories || []}
        trendingArticles={trendingArticles || []}
      />
    </div>
  );
}
