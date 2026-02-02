import { HOME_INTRO } from "~/constants/intros";
import type { HomeOurProductStat } from "~/types";
import DescriptionHeader from "~/ui/section-header/description-header";
import EyebrowHeader from "~/ui/section-header/eyebrow-header";
import TitleHeader from "~/ui/section-header/title-header";
import StatSection from "~/ui/stat-section";

interface OurProductProps {
  stats: HomeOurProductStat[];
}

export default function OurProduct({ stats }: OurProductProps) {
  const { title, description, eyebrow, image } = HOME_INTRO.ourProduct;

  return (
    <div className="w-full flex flex-col justify-between px-3 mt-10 md:px-6 lg:p-8 lg:flex-row lg:gap-30">
      <div className="flex flex-col items-center lg:items-start">
        <div className="flex flex-col gap-2 lg:gap-3">
          <EyebrowHeader text={eyebrow} />
          <TitleHeader text={title} />
          <DescriptionHeader text={description} />
        </div>

        <button className="mt-6 w-full text-white p-2 rounded text-sm bg-main md:w-1/2 lg:w-1/3 cursor-pointer hover:bg-cyan-800 transition-all decoration-300">
          Learn More
        </button>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 mt-6 place-items-center md:mt-10">
          {stats.map((stat) => (
            <StatSection stat={stat} key={stat.id} />
          ))}
        </div>

        <img
          src={HOME_INTRO.ourProduct.image}
          alt=""
          className="mt-4 rounded scale-90 lg:scale-100 lg:mt-8"
        />
      </div>
    </div>
  );
}
