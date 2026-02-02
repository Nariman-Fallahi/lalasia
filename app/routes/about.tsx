import OurMission from "~/components/about/our-mission";
import OurTeam from "~/components/about/our-team";
import CustomVideoPlayer from "~/components/custom-video-player";
import PageTitle from "~/ui/page-title";
import type { Route } from "./+types/about";
import { createClient } from "~/utils/supabase/client";
import { ABOUT_INTRO } from "~/constants/intros";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About" },
    { name: "description", content: "Lalasia About Page" },
  ];
}

export async function loader() {
  const supabase = createClient();

  const [stats, features, members] = await Promise.all([
    supabase.from("about_mission_stats").select("*"),
    supabase.from("about_mission_features").select("*"),
    supabase.from("about_team_members").select("*"),
  ]);

  return {
    missionStats: stats.data,
    missionFeatures: features.data,
    teamMembers: members.data,
  };
}

export default function About({ loaderData }: Route.ComponentProps) {
  const { missionFeatures, missionStats, teamMembers } = loaderData;

  return (
    <div className="px-3 md:px-6 lg:p-8">
      <PageTitle
        title={ABOUT_INTRO.header.title}
        description={ABOUT_INTRO.header.description}
      />

      <div className="mt-6">
        <CustomVideoPlayer video_URL={ABOUT_INTRO.header.videoUrl} />
      </div>

      <OurMission
        aboutMissionFeatures={missionFeatures || []}
        aboutMissionStats={missionStats || []}
      />

      <OurTeam aboutTeamMembers={teamMembers || []} />
    </div>
  );
}
