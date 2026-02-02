import type { IntroType } from "~/types/introType";
import PageTitle from "../../ui/page-title";

interface HeaderProps {
  data: IntroType;
}

export default function Header({ data }: HeaderProps) {
  return (
    <div className="w-full">
      <PageTitle title={data.title!} description={data.description!} />

      <img
        src={data.image!}
        alt=""
        className="w-full mt-6 rounded object-contain h-80 md:object-cover md:h-100 md:object-center"
      />
    </div>
  );
}
