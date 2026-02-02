import { ABOUT_INTRO } from "~/constants/intros";
import type { AboutTeamMember } from "~/types";
import DescriptionHeader from "~/ui/section-header/description-header";
import EyebrowHeader from "~/ui/section-header/eyebrow-header";
import TitleHeader from "~/ui/section-header/title-header";

interface OurTeamProps {
  aboutTeamMembers: AboutTeamMember[];
}

export default function OurTeam({ aboutTeamMembers }: OurTeamProps) {
  const { title, description, eyebrow } = ABOUT_INTRO.team;

  return (
    <div className="mt-10 lg:mt-40">
      <div className="flex flex-col lg:gap-2">
        <EyebrowHeader text={eyebrow} />
        <div className="flex flex-col md:flex-row md:justify-between">
          <TitleHeader text={title} />
          <DescriptionHeader text={description} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:mt-10 lg:gap-8">
        {aboutTeamMembers.map((item) => (
          <div key={item.id} className="flex flex-col gap-2">
            <img src={item.image} alt="" className="h-70 rounded lg:h-80" />
            <b className="text-sm lg:text-[26px] lg:mt-1">{item.name}</b>
            <p className="text-xs text-paragraphColor lg:text-base">
              {item.position}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
