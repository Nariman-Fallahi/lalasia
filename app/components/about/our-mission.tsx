import StatsSection from "~/ui/stat-section";
import EyebrowHeader from "~/ui/section-header/eyebrow-header";
import TitleHeader from "~/ui/section-header/title-header";
import type { AboutMissionFeature, AboutMissionStat } from "~/types";
import { ABOUT_INTRO } from "~/constants/intros";

interface OurMissionProps {
  aboutMissionStats: AboutMissionStat[];
  aboutMissionFeatures: AboutMissionFeature[];
}

export default function OurMission({
  aboutMissionStats,
  aboutMissionFeatures,
}: OurMissionProps) {
  const { title, eyebrow } = ABOUT_INTRO.mission;
  return (
    <div className="mt-10 flex flex-col lg:mt-40 md:flex-row md:gap-8 lg:gap-10">
      <div className="flex flex-col gap-2 lg:gap-3">
        <EyebrowHeader text={eyebrow} />
        <TitleHeader text={title} />

        <div className="grid grid-cols-3 mt-6 place-items-center md:mt-10">
          {aboutMissionStats.map((stat) => (
            <StatsSection stat={stat} key={stat.id} />
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-10">
        {aboutMissionFeatures.map((item) => (
          <div key={item.id} className="flex gap-5">
            <div className="size-10 rounded-full bg-[#f1f1f1] grid place-items-center lg:size-16">
              <img src={item.icon} alt="" className="lg:size-8" />
            </div>
            <div className="flex flex-col gap-2 w-[80%]">
              <b className="lg:text-[26px]">{item.title}</b>
              <p className="text-sm text-paragraphColor lg:text-base">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
