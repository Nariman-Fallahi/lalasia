import type { Product } from "~/types";
import Pagination from "../pagination";
import ProductCard from "../product-card";

interface ProductsListProps {
  data: Product[];
  totalPages: number;
  totalProducts: number;
}

export default function ProductsList({
  data,
  totalPages,
  totalProducts,
}: ProductsListProps) {
  return (
    <div className="flex flex-col px-3 mt-4 lg:px-8">
      <div className="flex items-center gap-2 lg:gap-5">
        <b className="text-lg lg:text-[44px]">Total Products</b>
        <div className="px-2 py-1 rounded-full bg-lineColor grid place-items-center lg:px-3">
          <b className="text-main text-xs text-center lg:text-lg">
            {totalProducts}
          </b>
        </div>
      </div>

      <div className="grid grid-cols-2 mt-4 gap-3 md:grid-cols-3 lg:gap-6 lg:mt-6">
        {data.map((item) => (
          <ProductCard data={item} key={item.id} />
        ))}
      </div>

      {data.length > 0 && (
        <div className="w-full flex justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}
