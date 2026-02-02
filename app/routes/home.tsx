import Header from "~/components/home/header";
import type { Route } from "./+types/home";
import Benefits from "~/components/home/benefits";
import Product from "~/components/home/product";
import OurProduct from "~/components/home/our-product";
import Testimonials from "~/components/home/testimonials";
import Articles from "~/components/home/articles";
import { createClient } from "~/utils/supabase/client";
import { ARTICLE_WITH_CATEGORY_QUERY, mapArticleCategory, mapArticlesWithCategory } from "~/utils/article-helpers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Lalasia" },
    { name: "description", content: "Lalasia Home Page" },
  ];
}

export async function loader() {
  const supabase = createClient();

  const [
    benefitRes,
    productsRes,
    statsRes,
    testimonialsRes,
    articlesRes,
    latestRes,
  ] = await Promise.all([
    supabase.from("home_benefit_features").select("*"),
    supabase.from("products").select("*").range(0, 9),
    supabase.from("home_our_product_stats").select("*"),
    supabase.from("home_testimonials").select("*"),
    supabase.from("articles").select(ARTICLE_WITH_CATEGORY_QUERY),
    supabase
      .from("articles")
      .select(ARTICLE_WITH_CATEGORY_QUERY)
      .order("created_at", { ascending: false })
      .limit(1),
  ]);

  return {
    benefitFeatures: benefitRes.data ?? [],
    products: productsRes.data ?? [],
    ourProductStats: statsRes.data ?? [],
    testimonials: testimonialsRes.data ?? [],
    articlesWithCategory: mapArticlesWithCategory(articlesRes.data),
    latestArticle: mapArticleCategory(latestRes.data?.[0]),
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const {
    benefitFeatures,
    products,
    ourProductStats,
    testimonials,
    articlesWithCategory,
    latestArticle,
  } = loaderData;

  return (
    <>
      <Header />
      <Benefits features={benefitFeatures!} />
      <Product products={products!} />
      <OurProduct stats={ourProductStats!} />
      <Testimonials testimonials={testimonials!} />
      <Articles articles={articlesWithCategory} latestArticle={latestArticle} />
    </>
  );
}
