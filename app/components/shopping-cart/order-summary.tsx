import { Link } from "react-router";

type SummaryProps = {
  subTotal: number;
  shipping: number;
  total: number;
};

export function OrderSummary({ subTotal, shipping, total }: SummaryProps) {
  return (
    <div className="border border-gray-200 rounded p-4 flex flex-col gap-4 h-fit lg:p-6">
      <b className="text-lg lg:text-2xl">Order Summary</b>
      <div className="flex flex-col gap-2 text-sm lg:text-base">
        <div className="flex justify-between text-paragraphColor">
          <span>Subtotal</span>
          <span>${subTotal}</span>
        </div>
        <div className="flex justify-between text-paragraphColor">
          <span>Shipping</span>
          <span>${shipping}</span>
        </div>
        <div className="h-px bg-gray-200 my-1"></div>
        <div className="flex justify-between font-bold text-base lg:text-lg">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      <button className="w-full text-white bg-main rounded p-2 cursor-pointer hover:bg-[#406d6b] transition-all duration-300">
        Checkout
      </button>
      <Link
        to="/products"
        className="w-full text-center text-main font-medium text-sm lg:text-base"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
