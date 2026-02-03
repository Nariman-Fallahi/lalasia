import type { Service } from "~/types";

interface ServiceListProps {
  data: Service[];
}

export default function Service({ data }: ServiceListProps) {
  return (
    <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
      {data.map((item) => (
        <div key={item.id} className="flex flex-col gap-2">
          <b className="text-[32px] text-main md:text-4xl lg:text-[64px]">
            {String(item.id).padStart(2, "0")}
          </b>
          <b className="text-sm md:text-base lg:text-2xl lg:mt-1">
            {item.title}
          </b>
          <p className="text-xs text-paragraphColor md:text-sm lg:text-lg">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
