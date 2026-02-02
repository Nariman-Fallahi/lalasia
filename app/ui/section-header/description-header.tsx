export default function DescriptionHeader({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <p
      className={`text-sm text-paragraphColor md:w-1/2 md:text-[15px] lg:text-lg ${className}`}
    >
      {text}
    </p>
  );
}
