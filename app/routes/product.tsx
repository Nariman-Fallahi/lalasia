import ProductDetails from "~/components/product/product-details";
import type { Route } from "./+types/product";
import RelatedItems from "~/components/product/related-items";
import { createClient } from "~/utils/supabase/client";
import {
  ARTICLE_WITH_CATEGORY_QUERY,
  mapArticlesWithCategory,
} from "~/utils/article-helpers";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Product" },
    { name: "description", content: "Lalasia Product Page" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  const supabase = createClient();
  const id = params.productId;

  const { data: product, error } = await supabase
    .from("products")
    .select(
      `
      *,
      colors:product_colors(
        color_info:colors(*)
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error || !product) {
    throw new Response("Product Not Found", { status: 404 });
  }

  const { data: relatedItems } = await supabase
    .from("products")
    .select(ARTICLE_WITH_CATEGORY_QUERY)
    .eq("category", product.category)
    .neq("id", id)
    .limit(4);

  const formattedColors = product.colors?.map((c: any) => c.color_info) || [];

  return {
    product,
    colors: formattedColors,
    relatedItems: mapArticlesWithCategory(relatedItems),
  };
}

export default async function Product({ loaderData }: Route.ComponentProps) {
  const { product, colors, relatedItems } = loaderData;

  return (
    <div className="px-3 md:px-6 lg:p-8">
      <ProductDetails product={product || []} colorsHex={colors} />
      <RelatedItems data={relatedItems} />
    </div>
  );
}
