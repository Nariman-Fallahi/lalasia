import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import type { ProductHeroSlide } from "~/types";

interface HeroSliderProps {
  data: ProductHeroSlide[];
}

export default function HeroSlider({ data }: HeroSliderProps) {
  const autoplay = Autoplay({ delay: 6000, stopOnInteraction: false });
  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay]);

  return (
    <div className="w-full overflow-hidden mt-6" ref={emblaRef}>
      <div className="flex gap-6">
        {data.map((item) => (
          <div key={item.id} className="w-full flex-[0_0_100%] lg:h-110">
            <img
              src={item.image}
              alt="Hero slider Image"
              className="w-full aspect-video object-cover lg:text-center"
            />
            <div className="absolute w-full bottom-10 px-6 flex flex-col gap-2">
              <b className="text-white lg:text-[44px]">{item.title}</b>
              <p className="text-sm text-gray-200 lg:text-2xl">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
