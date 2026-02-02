interface PageTitleProps {
  title: string;
  description: string;
}

export default function PageTitle({ description, title }: PageTitleProps) {
  return (
    <div className="w-full mt-10 flex flex-col items-center lg:mt-12">
      <b className="text-[26px] lg:text-6xl">{title}</b>
      <p className="text-sm text-paragraphColor mt-2 lg:mt-5 px-3 text-center lg:text-lg md:w-[60%] lg:w-1/2">
        {description}
      </p>
    </div>
  );
}
