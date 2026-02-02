import { HOME_INTRO } from "~/constants/intros";
import SearchBox from "../search-box";

export default function Header() {
  const { title, description, image } = HOME_INTRO.header;

  return (
    <div className="w-full mt-8 flex flex-col items-center px-3">
      <div className="flex md:justify-center">
        <img
          src="/icons/line-arrow-spiral-down.svg"
          alt="line-arrow-spiral-down"
          className="absolute mt-2 left-5 md:w-30 lg:w-50 md:left-30 xl:left-50"
        />
        <h2 className="font-bold text-2xl text-center md:text-4xl lg:text-6xl md:w-2/3 lg:w-[60%]">
          {title}
          <img
            src="/icons/h2TextHeaderIcon.svg"
            alt="Icon"
            className="size-6 inline ml-1 mb-4 md:size-8 lg:size-10 lg:mb-6"
          />
        </h2>
      </div>

      <p className="text-sm text-paragraphColor text-center mt-7 lg:mt-9 md:w-1/2 md:text-base lg:text-lg">
        {description}
      </p>

      <div className="w-full flex flex-col items-center relative">
        <div className="w-[95%] mt-6 md:w-1/2 z-10">
          <SearchBox isNavigateToProducts />
        </div>

        <img
          src={image}
          alt="Header Image"
          className="mt-6 h-40 rounded-sm w-[95%] md:w-[80%] lg:mt-12 md:h-fit"
        />
      </div>
    </div>
  );
}
