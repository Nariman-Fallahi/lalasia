import useEmblaCarousel from "embla-carousel-react";
import DescriptionHeader from "~/ui/section-header/description-header";
import EyebrowHeader from "~/ui/section-header/eyebrow-header";
import TitleHeader from "~/ui/section-header/title-header";
import ProductCard from "../product-card";
import type { Product } from "~/types";
import { HOME_INTRO } from "~/constants/intros";

interface ProductProps {
  products: Product[];
}

export default function Product({ products }: ProductProps) {
  const { title, description, eyebrow } = HOME_INTRO.product;
  const [emblaRef] = useEmblaCarousel({ dragFree: true });

  return (
    <div className="w-full flex flex-col items-center px-3 mt-10 md:px-6 lg:p-8">
      <div className="flex flex-col lg:gap-2 items-center">
        <EyebrowHeader text={eyebrow} />
        <div className="gap-2 items-center flex flex-col lg:gap-3">
          <TitleHeader text={title} />
          <DescriptionHeader text={description} className="md:text-center" />
        </div>
      </div>

      <div className="w-full overflow-hidden mt-6" ref={emblaRef}>
        <div className="flex gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="flex-[0_0_60%] md:flex-[0_0_40%] lg:flex-[0_0_30%]"
            >
              <ProductCard data={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
