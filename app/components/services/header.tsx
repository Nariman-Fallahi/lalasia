import PageTitle from "../../ui/page-title";

interface HeaderProps {
  title: string;
  description?: string;
  image: string;
}

export default function Header({ title, description, image }: HeaderProps) {
  return (
    <div className="w-full">
      <PageTitle title={title} description={description || ""} />

      <img
        src={image}
        alt=""
        className="w-full mt-6 rounded object-contain h-80 md:object-cover md:h-100 md:object-center"
      />
    </div>
  );
}
