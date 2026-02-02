import type { IntroType, ServicePortfolioFeature } from "~/types";
import DescriptionHeader from "~/ui/section-header/description-header";
import EyebrowHeader from "~/ui/section-header/eyebrow-header";
import TitleHeader from "~/ui/section-header/title-header";

interface PortofolioProps {
  data: { intro: IntroType; features: ServicePortfolioFeature[] };
}

export default function Portofolio({ data }: PortofolioProps) {
  return (
    <div className="mt-20 flex flex-col">
      <div className="flex flex-col gap-1 md:gap-2">
        <EyebrowHeader text={data.intro.eyebrow!} />
        <div className="flex flex-col md:flex-row md:justify-between gap-2">
          <div className="md:w-[45%]">
            <TitleHeader text={data.intro.title!} />
          </div>
          <DescriptionHeader text={data.intro.description!} />
        </div>
      </div>

      <div className="w-full mt-8 gap-6 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data.features.map((item) => (
          <div key={item.id} className="w-full relative">
            <img src={item.image} alt="" className="w-full h-100 rounded" />
            <div className="absolute top-[55%] px-6 flex flex-col gap-1">
              <b className="text-sm text-white lg:text-[26px]">{item.title}</b>
              <p className="text-xs text-gray-200 lg:text-lg line-clamp-3">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
