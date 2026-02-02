import Header from "~/components/services-page/header";
import Portofolio from "~/components/services-page/portofolio";
import ServiceList from "~/components/services-page/service-list";
import type { Route } from "./+types/services";
import { createClient } from "~/utils/supabase/client";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Services" },
    { name: "description", content: "Lalasia Services Page" },
  ];
}

export async function loader() {
  const supabase = createClient();

  const { data: serviceIntro } = await supabase
    .from("service_intro")
    .select("*")
    .eq("id", 1)
    .single();

  const { data: serviceFeature } = await supabase
    .from("service_feature")
    .select("*");

  const { data: servicePortfolioIntro } = await supabase
    .from("service_portfolio_intro")
    .select("*")
    .eq("id", 1)
    .single();

  const { data: servicePortfolioFeature } = await supabase
    .from("service_portfolio_feature")
    .select("*");

  return {
    serviceIntro,
    serviceFeature,
    servicePortfolioIntro,
    servicePortfolioFeature,
  };
}

export default function Services({ loaderData }: Route.ComponentProps) {
  const {
    serviceIntro,
    serviceFeature,
    servicePortfolioIntro,
    servicePortfolioFeature,
  } = loaderData;

  return (
    <div className="px-3 md:px-6 lg:p-8">
      <Header data={serviceIntro!} />
      <ServiceList data={serviceFeature!} />
      <Portofolio
        data={{
          intro: servicePortfolioIntro!,
          features: servicePortfolioFeature!,
        }}
      />
    </div>
  );
}
