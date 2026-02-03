import { Link } from "react-router";

export function EmptyCart() {
  return (
    <div className="w-full border border-gray-200 rounded p-6 flex flex-col gap-3 items-center text-center">
      <b className="text-lg lg:text-2xl">Your cart is empty</b>
      <p className="text-sm text-paragraphColor lg:text-lg">
        Looks like you haven't added anything yet.
      </p>
      <Link
        to="/products"
        className="mt-2 px-4 py-2 bg-main text-white rounded text-sm lg:text-base hover:bg-[#406b68] transition-all duration-300"
      >
        Browse Products
      </Link>
    </div>
  );
}
