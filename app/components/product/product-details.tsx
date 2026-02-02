import { CheckCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Product } from "~/types";

interface ProductDetailsProps {
  product: Product;
  colorsHex: {
    id: number;
    hex: string;
  }[];
}

export default function ProductDetails({
  product,
  colorsHex,
}: ProductDetailsProps) {
  const [selectedIdColor, setSelectedIdColor] = useState<number>();
  const [isReadMore, setIsReadMore] = useState<boolean>(false);
  const [shouldShowButton, setShouldShowButton] = useState<boolean>(false);

  const textRef = useRef<HTMLParagraphElement>(null);

  // This useEffect checks if the content of the paragraph exceeds 4 lines. If it
  // does, it shows the "Show More" button.

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      const fullHeight = element.scrollHeight;
      const lineHeight = parseFloat(
        getComputedStyle(element).lineHeight || "20",
      );
      const lines = fullHeight / lineHeight;

      if (lines > 4) {
        setShouldShowButton(true);
      }
    }
  }, []);

  return (
    <div className="w-full flex flex-col mt-6 gap-3 md:flex-row md:gap-6 lg:gap-10">
      <img
        src={product.image}
        alt=""
        className="h-80 object-contain md:h-100 md:object-cover md:object-center rounded lg:w-[40%]"
      />
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl mt-6 md:mt-0 lg:text-[44px]">
          {product.title}
        </h1>
        <h2 className="text-sm text-paragraphColor font-medium lg:text-lg">
          {product.short_description}
        </h2>

        <b className="mt-2 lg:text-lg">Color</b>
        <div className="flex">
          {colorsHex.map((item) => {
            const isSelected = selectedIdColor === item?.id;
            return (
              <div
                key={item?.id}
                onClick={() => setSelectedIdColor(item?.id)}
                className={`size-8 lg:size-12.5 cursor-pointer flex justify-center items-center`}
                style={{ backgroundColor: item?.hex }}
              >
                {isSelected && (
                  <CheckCheck className="text-gray-600 size-4 lg:size-6" />
                )}
              </div>
            );
          })}
        </div>

        <p
          ref={textRef}
          className={`text-sm font-medium text-paragraphColor mt-2 lg:text-lg ${
            !isReadMore && "line-clamp-4"
          }`}
        >
          {product.long_description}
        </p>
        {shouldShowButton && (
          <button
            onClick={() => setIsReadMore((prev) => !prev)}
            className="text-sm font-medium text-main w-fit cursor-pointer lg:text-base"
          >
            {isReadMore ? "Show less" : "Read More"}
          </button>
        )}

        <b className="text-2xl mt-3 lg:text-[44px]">${product.price}</b>

        <div className="w-full flex flex-col items-center gap-3 mt-3 text-[15px] font-bold lg:flex-row lg:text-lg lg:mt-6">
          <button className="w-full text-white bg-main rounded p-2 cursor-pointer hover:bg-[#406d6b] transition-all decoration-300">
            Buy Now
          </button>
          <button className="w-full text-black bg-lineColor rounded p-2  hover:bg-[#e0e0e0] cursor-pointer transition-all decoration-300">
            Add to Chart
          </button>
        </div>
      </div>
    </div>
  );
}
