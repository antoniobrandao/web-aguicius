import { BackofficeEditor } from "@/components/backoffice/backoffice-editor";
import { getWebsiteContent } from "@/lib/content/website-content";

export const dynamic = "force-dynamic";

export default async function BackofficePage() {
  const { content, source } = await getWebsiteContent();
  return (
    <BackofficeEditor
      initialContent={content}
      source={source}
      section="painel"
    />
  );
}
