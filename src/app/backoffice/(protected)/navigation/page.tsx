import { NavigationEditor } from "../../_components/editors";
import { SectionHeader } from "../../_components/shell";
import { getWebsiteContent } from "@/lib/content/website-content";

export const dynamic = "force-dynamic";

export default async function BackofficeNavigationPage() {
  const { content } = await getWebsiteContent();

  return (
    <div className="grid gap-6">
      <SectionHeader
        eyebrow="Navegação"
        title="Navegação"
        description="Links do menu principal e links institucionais do footer."
      />
      <NavigationEditor initialValue={content.navigation} />
    </div>
  );
}
