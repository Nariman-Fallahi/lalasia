import Header from "~/components/services/header";
import Portofolio from "~/components/services/portofolio";
import Service from "~/components/services/service";
import type { Route } from "./+types/services";
import { createClient } from "~/utils/supabase/client";
import { SERVICES_INTRO } from "~/constants/intros";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Services" },
    { name: "description", content: "Lalasia Services Page" },
  ];
}

export async function loader() {
  const supabase = createClient();

  const [serviceFeaturesResponse, portfolioFeatureResponse] = await Promise.all(
    [
      supabase.from("service_features").select("*"),
      supabase.from("service_portfolio_features").select("*"),
    ],
  );

  return {
    serviceFeatures: serviceFeaturesResponse.data ?? [],
    servicePortfolioFeature: portfolioFeatureResponse.data ?? [],
  };
}

export default function Services({ loaderData }: Route.ComponentProps) {
  const { serviceFeatures, servicePortfolioFeature } = loaderData;
  const { header } = SERVICES_INTRO;

  return (
    <div className="px-3 md:px-6 lg:p-8">
      <Header
        title={header.title}
        description={header.description}
        image={header.image}
      />
      <Service data={serviceFeatures!} />
      <Portofolio features={servicePortfolioFeature} />
    </div>
  );
}
