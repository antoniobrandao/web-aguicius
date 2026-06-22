import { Container } from "@/components/shared/container";

export function StorySection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <span className="eyebrow">A nossa história</span>
          <h2 className="display-heading mt-4 text-3xl text-secondary sm:text-4xl">
            Desenvolver e aplicar soluções Smart para o mercado de serviços e
            transporte.
          </h2>
        </div>

        <div className="flex flex-col gap-5 text-base leading-relaxed text-muted-foreground lg:col-span-7">
          <p>
            Aliando os largos anos de experiência como motorista profissional à
            visão de que ao mercado da logística faltavam soluções para o
            transporte de mercadorias mais delicadas, o nosso fundador,{" "}
            <strong className="font-semibold text-secondary">
              Bruno António Ferreira
            </strong>
            , apostou arduamente na sua formação académica para obter a
            capacidade profissional de gestão de empresas de transportes.
          </p>
          <p>
            Neste seguimento começou um processo de recrutamento de uma
            “brigada” de recursos humanos altamente competentes e profissionais,
            apostando continuamente na sua formação, focando o objetivo da
            empresa num serviço de excelência na área do transporte de
            mercadorias delicadas e entregas técnicas.
          </p>
          <p className="text-xl font-bold uppercase tracking-wide text-secondary">
            Assim nasceu a Aguicius.
          </p>
        </div>
      </Container>
    </section>
  );
}
