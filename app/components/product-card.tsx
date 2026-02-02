import { Link } from "react-router";
import type { ProductListType } from "~/types";

interface ProductCardProps {
  data: ProductListType;
}

export default function ProductCard({ data }: ProductCardProps) {
  return (
    <Link
      to={`/product/${data.id}`}
      className="flex flex-col border border-gray-200 hover:border-gray-300 transition-all decoration-300 cursor-pointer"
    >
      <img src={data.image} alt="" className="w-full h-30 lg:h-70" />
      <div className="flex flex-col p-3 gap-2 mt-1">
        <b className="w-fit text-xs text-paragraphColor lg:text-lg">
          {data.category}
        </b>
        <b className="w-fit text-sm line-clamp-1 lg:text-[26px] cursor-pointer!">
          {data.title}
        </b>
        <p className="w-fit font-medium text-paragraphColor text-sm line-clamp-1 lg:text-lg">
          {data.short_description}
        </p>
        <b className="w-fit text-sm mt-1 lg:text-2xl">${data.price}</b>
      </div>
    </Link>
  );
}
