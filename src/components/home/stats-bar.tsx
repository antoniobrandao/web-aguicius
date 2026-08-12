import { Container } from "@/components/shared/container";

export function StatsBar({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <section className="border-y border-white/10 bg-zinc-100 text-white">
      <Container className="py-12 lg:py-14">
        <ul className="flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-16 lg:gap-24">
          {stats.map((stat) => (
            <li key={stat.label} className="flex flex-col items-center gap-1 text-center">
              <span className="text-4xl font-medium tracking-tight text-zinc-800 sm:text-5xl">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-[0.15em] text-zinc-500">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
