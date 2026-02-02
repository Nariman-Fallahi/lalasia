import type { Route } from "./+types/products";
import PageTitle from "~/ui/page-title";
import HeroSlider from "~/components/products/hero-slider";
import ProductsList from "~/components/products/products-list";
import SearchBox from "~/components/search-box";
import { createClient } from "~/utils/supabase/client";
import { PRODUCTS_INTRO } from "~/constants/intros";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products" },
    { name: "description", content: "Lalasia Products Page" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const supabase = createClient();
  const url = new URL(request.url);

  const pageSize = 10;
  const currentPage = Math.max(1, Number(url.searchParams.get("page")) || 1);
  const offset = (currentPage - 1) * pageSize;

  const search = url.searchParams.get("search") || "";

  const [heroResponse, productsResponse] = await Promise.all([
    supabase.from("product_hero_slides").select("*"),

    supabase
      .from("products")
      .select("*", { count: "exact" })
      .ilike("title", `%${search}%`)
      .range(offset, offset + pageSize - 1)
      .order("created_at", { ascending: false }),
  ]);

  return {
    heroSlides: heroResponse.data || [],
    products: {
      items: productsResponse.data || [],
      totalCount: productsResponse.count || 0,
    },
  };
}
export default function Products({ loaderData }: Route.ComponentProps) {
  const { heroSlides, products } = loaderData;
  const totalPages = Math.ceil(products.totalCount / 10);

  return (
    <>
      <PageTitle
        title={PRODUCTS_INTRO.header.title}
        description={PRODUCTS_INTRO.header.description}
      />
      <HeroSlider data={heroSlides || []} />
      <div className="mt-6 p-3 flex md:justify-center">
        <div className="w-full md:w-2/3">
          <SearchBox />
        </div>
      </div>
      <ProductsList
        data={products.items || []}
        totalPages={totalPages}
        totalProducts={products.totalCount || 0}
      />
    </>
  );
}
