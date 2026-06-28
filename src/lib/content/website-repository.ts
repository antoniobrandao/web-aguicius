import type { Collection } from "mongodb";

import { defaultWebsiteContent } from "@/content/default-website";
import { getMongoClient } from "@/lib/mongodb/client";

import { websiteContentSchema } from "./website-schema";
import type {
  AguiciusWebsiteContent,
  AguiciusWebsiteSnapshot,
} from "./website-types";

function getCollectionName() {
  const collection = process.env.MONGODB_COLLECTION;
  if (!collection) {
    throw new Error("MONGODB_COLLECTION is not configured.");
  }
  return collection;
}

async function getSnapshotsCollection(): Promise<
  Collection<AguiciusWebsiteSnapshot>
> {
  const client = await getMongoClient();
  return client.db().collection<AguiciusWebsiteSnapshot>(getCollectionName());
}

function normalizeContent(data: unknown): AguiciusWebsiteContent {
  const parsed = websiteContentSchema.parse(data);

  return {
    ...parsed,
    services: parsed.services.map((service) => ({
      ...service,
      image:
        service.image && typeof service.image === "object"
          ? service.image
          : {
              alt: `${service.title} Aguicius`,
            },
    })),
  };
}

export async function getLatestWebsiteSnapshot() {
  const collection = await getSnapshotsCollection();
  return collection.findOne(
    {},
    { sort: { revision: -1, createdAt: -1 } },
  );
}

export async function getLatestWebsiteContent() {
  const snapshot = await getLatestWebsiteSnapshot();
  if (!snapshot) {
    return {
      content: normalizeContent(defaultWebsiteContent),
      source: "default" as const,
    };
  }

  return {
    content: normalizeContent(snapshot.content),
    source: "mongo" as const,
    revision: snapshot.revision,
    createdAt: snapshot.createdAt,
  };
}

export async function saveWebsiteContentSnapshot(
  content: AguiciusWebsiteContent,
) {
  const collection = await getSnapshotsCollection();
  const parsed = normalizeContent(content);
  const latest = await getLatestWebsiteSnapshot();
  const revision = (latest?.revision ?? 0) + 1;
  const createdAt = new Date();

  await collection.insertOne({
    content: parsed,
    revision,
    createdAt,
  });

  return {
    content: parsed,
    source: "mongo" as const,
    revision,
    createdAt,
  };
}

export async function seedDefaultWebsiteContent() {
  return saveWebsiteContentSnapshot(defaultWebsiteContent);
}

export { getCollectionName };
