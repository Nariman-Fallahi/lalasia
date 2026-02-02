import { HOME_INTRO } from "~/constants/intros";
import type { HomeBenefitFeature } from "~/types";
import DescriptionHeader from "~/ui/section-header/description-header";
import EyebrowHeader from "~/ui/section-header/eyebrow-header";
import TitleHeader from "~/ui/section-header/title-header";

interface BenefitsProps {
  features: HomeBenefitFeature[];
}

export default function Benefits({ features }: BenefitsProps) {
  const { title, description, eyebrow } = HOME_INTRO.benefits;

  return (
    <div className="w-full flex flex-col px-3 mt-10 md:px-6 lg:p-8">
      <div className="flex flex-col md:gap-2">
        <EyebrowHeader text={eyebrow} />
        <div className="flex flex-col md:flex-row md:justify-between">
          <TitleHeader text={title} />
          <DescriptionHeader text={description} />
        </div>
      </div>

      <div className="w-full grid grid-cols-1 mt-6 gap-5 md:grid-cols-3 md:mt-8 lg:gap-7 lg:mt-10">
        {features.map((item) => (
          <div
            key={item.id}
            className="p-3 flex flex-col gap-3 bg-white rounded lg:gap-4"
          >
            <img src={item.icon} alt="" className="size-10 lg:size-14" />
            <b className="lg:text-2xl">{item.title}</b>
            <p className="text-paragraphColor text-sm lg:text-lg">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
