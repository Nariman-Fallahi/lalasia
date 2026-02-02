export default function StatSection({
  stat,
}: {
  stat: { id: number; label: string; value: string };
}) {
  return (
    <div key={stat.id} className="flex flex-col lg:gap-2">
      <b className="text-xl lg:text-5xl">{stat.value}</b>
      <p className="text-sm text-paragraphColor lg:text-lg">{stat.label}</p>
    </div>
  );
}
