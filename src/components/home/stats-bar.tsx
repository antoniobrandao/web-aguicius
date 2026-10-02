import { Container } from "@/components/shared/container";

export function StatsBar({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <section className="bg-frontend-muted pb-16 lg:pb-20">
      <Container>
        <dl className="frontend-card grid divide-y divide-frontend-border sm:auto-cols-fr sm:grid-flow-col sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1 px-8 py-7">
              <dt className="text-[0.9375rem] text-frontend-body">{stat.label}</dt>
              <dd className="frontend-display-heading text-4xl tabular-nums text-frontend-heading">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
