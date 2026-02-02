import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

interface SearchBoxProps {
  isNavigateToProducts?: boolean;
}

export default function SearchBox({ isNavigateToProducts }: SearchBoxProps) {
  const [value, setValue] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const search = searchParams.get("search");
    setValue(decodeURIComponent(search || ""));
  }, [searchParams]);

  const handleSearchSubmit = () => {
    if (!value) return;

    if (isNavigateToProducts) {
      navigate(`/products?search=${encodeURIComponent(value)}`);
    } else {
      setSearchParams({ search: value || "" });
    }
  };

  return (
    <div className="w-full flex p-1 items-center gap-3 justify-between border border-gray-200 rounded-sm lg:p-2 bg-gray-100">
      <Search className="text-paragraphColor" />
      <input
        type="text"
        placeholder="Search property"
        className="outline-none text-sm grow lg:text-base"
        onChange={(e) => setValue(e.target.value)}
        value={value}
        onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
      />
      <button
        onClick={() => handleSearchSubmit()}
        className="p-2 bg-main text-white text-sm rounded-sm lg:w-[20%] cursor-pointer hover:bg-[#406b68] transition-all duration-300 lg:text-base"
      >
        Search
      </button>
    </div>
  );
}
