// Pure render helpers over the values read from /api/v1/blocks. Every helper
// takes the hardcoded text or photo as its fallback, so a missing, cleared or
// unreachable value renders exactly what the site had before. No `@/` or
// `server-only` imports: Node tests this file directly.

export type Blocks = Record<string, Record<string, unknown>>

export type BlockImage = {
  url: string
  alt: string
  width?: number
  height?: number
  focal: { x: number; y: number }
  fit: "cover" | "contain"
  aspect?: string
}

function valueOf(blocks: Blocks, key: string, id: string): unknown {
  const block = blocks?.[key]
  return block && typeof block === "object" ? block[id] : undefined
}

function isText(value: unknown): value is string {
  return typeof value === "string" && value.trim() !== ""
}

export function textOf(blocks: Blocks, key: string, id: string, fallback: string): string {
  const value = valueOf(blocks, key, id)
  return isText(value) ? value : fallback
}

export function htmlOf(blocks: Blocks, key: string, id: string, fallback: string): string {
  return textOf(blocks, key, id, fallback)
}

export function linkOf(
  blocks: Blocks,
  key: string,
  id: string,
  fallback: { label: string; href: string }
): { label: string; href: string } {
  const value = valueOf(blocks, key, id) as { label?: unknown; href?: unknown } | null | undefined
  if (value && typeof value === "object" && isText(value.label) && isText(value.href)) {
    return { label: value.label, href: value.href }
  }
  return fallback
}

/**
 * The array served for a bound `collection` field (or the rows of the `schedule`
 * setting): the documents the owner chose, in their order. An empty array is the
 * owner's choice to show nothing; undefined (key absent or not an array) means
 * "fall back to what the page reads itself".
 */
export function itemsOf<T>(blocks: Blocks, key: string, id: string): T[] | undefined {
  const value = valueOf(blocks, key, id)
  return Array.isArray(value) ? (value as T[]) : undefined
}

/** A bound `setting` served as a string, or undefined when absent, blank or not a string. */
export function settingOf(blocks: Blocks, key: string, id: string): string | undefined {
  const value = valueOf(blocks, key, id)
  return isText(value) ? value : undefined
}

export function listOf<T>(blocks: Blocks, key: string, id: string, fallback: T[]): T[] {
  const value = valueOf(blocks, key, id)
  return Array.isArray(value) && value.length > 0 ? (value as T[]) : fallback
}

function unit(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0.5
}

function dimension(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : undefined
}

export function imageOf(blocks: Blocks, key: string, id: string): BlockImage | null {
  return imageFrom(valueOf(blocks, key, id))
}

function savedItems(blocks: Blocks, key: string, id: string): unknown[] {
  const value = valueOf(blocks, key, id)
  return Array.isArray(value) ? value : []
}

function itemImage(item: unknown, field: string): BlockImage | null {
  return item && typeof item === "object" ? imageFrom((item as Record<string, unknown>)[field]) : null
}

/** The image `field` of item `index` of the list `id`, or null. */
export function itemImageOf(blocks: Blocks, key: string, id: string, index: number, field: string): BlockImage | null {
  return itemImage(savedItems(blocks, key, id)[index], field)
}

/** The saved items of the list `id` that hold an image `field`, each with its position in the list. */
export function listImagesOf(blocks: Blocks, key: string, id: string, field: string): { index: number; image: BlockImage }[] {
  const found: { index: number; image: BlockImage }[] = []
  savedItems(blocks, key, id).forEach((item, index) => {
    const image = itemImage(item, field)
    if (image) found.push({ index, image })
  })
  return found
}

function imageFrom(raw: unknown): BlockImage | null {
  const value = raw as Record<string, unknown> | null | undefined
  if (!value || typeof value !== "object" || typeof value.url !== "string" || value.url === "") return null
  const focal = (value.focal && typeof value.focal === "object" ? value.focal : {}) as Record<string, unknown>
  const image: BlockImage = {
    url: value.url,
    alt: typeof value.alt === "string" ? value.alt : "",
    focal: { x: unit(focal.x), y: unit(focal.y) },
    fit: value.fit === "contain" ? "contain" : "cover",
  }
  const width = dimension(value.width)
  const height = dimension(value.height)
  if (width !== undefined) image.width = width
  if (height !== undefined) image.height = height
  if (typeof value.aspect === "string" && value.aspect !== "") image.aspect = value.aspect
  return image
}

function aspectRatioOf(aspect: string | undefined): string | undefined {
  const match = /^\s*(\d+(?:\.\d+)?)\s*[:/]\s*(\d+(?:\.\d+)?)\s*$/.exec(aspect ?? "")
  if (!match) return undefined
  const [w, h] = [Number(match[1]), Number(match[2])]
  return w > 0 && h > 0 ? `${match[1]} / ${match[2]}` : undefined
}

export function imageStyle(image: BlockImage): { objectFit: string; objectPosition: string; aspectRatio?: string } {
  const style: { objectFit: string; objectPosition: string; aspectRatio?: string } = {
    objectFit: image.fit === "contain" ? "contain" : "cover",
    objectPosition: `${Math.round(unit(image.focal?.x) * 100)}% ${Math.round(unit(image.focal?.y) * 100)}%`,
  }
  const aspectRatio = aspectRatioOf(image.aspect)
  if (aspectRatio) style.aspectRatio = aspectRatio
  return style
}

export function blockAttrs(key: string): { "data-cd-block": string } {
  return { "data-cd-block": key }
}

export function fieldAttrs(id: string): { "data-cd-field": string } {
  return { "data-cd-field": id }
}

/** A list item by its position, or a collection's document by its slug. */
export function itemAttrs(key: string | number): { "data-cd-item": string | number } {
  return { "data-cd-item": key }
}
