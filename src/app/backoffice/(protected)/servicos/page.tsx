import { BackofficeEditor } from "@/components/backoffice/backoffice-editor";
import { getWebsiteContent } from "@/lib/content/website-content";

export default async function BackofficeServicosPage() {
  const { content, source } = await getWebsiteContent();
  return (
    <BackofficeEditor
      initialContent={content}
      source={source}
      section="servicos"
    />
  );
}
