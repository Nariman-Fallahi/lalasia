import { Trash2 } from "lucide-react";
import type { CartItemWithProduct, ProductWithQuantity } from "~/types";

type CartItemProps = {
  item: CartItemWithProduct;
  onUpdateQuantity: (id: number, colorId: number, newQty: number) => void;
  onRemove: (id: number, colorId: number) => void;
};

export function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  return (
    <div className="flex flex-col gap-4 border border-gray-200 rounded p-3 md:flex-row md:items-center lg:p-4">
      <img
        src={item.product.image}
        alt={item.product.title}
        className="w-full h-40 object-cover rounded md:w-40 md:h-28"
      />
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-paragraphColor lg:text-sm">
            {item.product.category}
          </span>
          <b className="text-base lg:text-xl">{item.product.title}</b>
          <p className="text-xs text-paragraphColor line-clamp-1">
            {item.product.short_description}
          </p>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-paragraphColor">Color:</span>
            <div
              className="size-4 rounded-full border border-gray-300"
              style={{ backgroundColor: item.color?.hex || "#ccc" }}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-lineColor rounded px-2 py-1">
            <button
              onClick={() =>
                onUpdateQuantity(
                  item.product_id,
                  item.color_id,
                  item.quantity - 1,
                )
              }
              disabled={item.quantity <= 1}
              className="text-sm font-bold text-main disabled:opacity-30 cursor-pointer p-1"
            >
              -
            </button>
            <span className="text-sm font-medium min-w-5 text-center">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                onUpdateQuantity(
                  item.product_id,
                  item.color_id,
                  item.quantity + 1,
                )
              }
              className="text-sm font-bold text-main cursor-pointer p-1"
            >
              +
            </button>
          </div>
          <b className="text-base lg:text-lg">${item.product.price}</b>
          <button
            onClick={() => onRemove(Number(item.product_id), item.color_id)}
            className="ml-auto text-paragraphColor hover:text-red-500 transition-all duration-300 flex items-center gap-1 text-xs lg:text-sm cursor-pointer"
          >
            <Trash2 className="size-4" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
