import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const getPaginationRange = (currentPage: number, totalPages: number) => {
    const delta = 1;
    const range = [];
    range.push(1);

    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < totalPages - 1) range.push("...");

    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const isPrevButtonDisabled = currentPage === 1;
  const isNextButtonDisabled = currentPage === totalPages;

  return (
    <nav className="mt-10">
      <ul className="w-full flex items-center">
        <li
          className={`mr-2 lg:mr-4 ${isPrevButtonDisabled && "text-paragraphColor"}`}
          onClick={() =>
            !isPrevButtonDisabled &&
            setSearchParams({ page: String(currentPage - 1) })
          }
        >
          <ChevronLeft className="size-6.5 lg:size-10 cursor-pointer" />
        </li>
        {getPaginationRange(currentPage, totalPages).map((item) => {
          return (
            <li
              key={item}
              onClick={() =>
                item !== "..." && setSearchParams({ page: String(item) })
              }
              className={`size-8 p-3 flex justify-center items-center lg:p-6 lg:text-lg cursor-pointer ${
                currentPage === item
                  ? "bg-main text-white"
                  : "border border-[#F3F3F3]"
              }`}
            >
              {item}
            </li>
          );
        })}

        <li
          className={`ml-2 lg:ml-4 ${isNextButtonDisabled && "text-paragraphColor"}`}
          onClick={() =>
            !isNextButtonDisabled &&
            setSearchParams({ page: String(currentPage + 1) })
          }
        >
          <ChevronRight className="size-6.5 lg:size-10 cursor-pointer" />
        </li>
      </ul>
    </nav>
  );
}
