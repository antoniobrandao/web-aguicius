import { websiteContentSchema } from "@/lib/content/website-schema";
import type { AguiciusWebsiteContent } from "@/lib/content/website-types";

import defaultWebsiteJson from "./default-website.json";

// default-website.json is the fallback content for this site copy, used when
// the casadigital.pt content API is unreachable or a page is missing there.
// Parsing at module load guarantees the fallback is always contract-valid.
export const defaultWebsiteContent: AguiciusWebsiteContent =
  websiteContentSchema.parse(defaultWebsiteJson);
