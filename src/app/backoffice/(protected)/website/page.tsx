import { WebsiteEditor } from "../../_components/editors";
import { SectionHeader } from "../../_components/shell";
import { getWebsiteContent } from "@/lib/content/website-content";

export const dynamic = "force-dynamic";

export default async function BackofficeWebsitePage() {
  const { content } = await getWebsiteContent();

  return (
    <div className="grid gap-6">
      <SectionHeader
        eyebrow="Website"
        title="Website"
        description="Identidade global, contactos, SEO e valores da empresa."
      />
      <WebsiteEditor
        initialValue={{
          site: content.site,
          values: content.values,
        }}
      />
    </div>
  );
}
