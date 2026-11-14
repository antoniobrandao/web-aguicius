import assert from "node:assert/strict"
import test from "node:test"

import {
  blockAttrs,
  fieldAttrs,
  htmlOf,
  imageOf,
  imageStyle,
  itemAttrs,
  itemImageOf,
  itemsOf,
  linkOf,
  listImagesOf,
  listOf,
  settingOf,
  textOf,
  type BlockImage,
} from "./blocks.ts"

const blocks = {
  "home.hero": {
    title: "Pão",
    lead: "  ",
    steps: [{ label: "A" }],
    none: [],
    body: "<p>Olá</p>",
    cta: { label: "Ver", href: "/menu" },
    badCta: { label: " ", href: "/menu" },
    photo: { url: "https://x.public.blob.vercel-storage.com/a.jpg", alt: "A", width: 800, height: 600, focal: { x: 0.2, y: 0.8 }, fit: "contain", aspect: "4:3" },
    noUrl: { alt: "x" },
    emptyUrl: { url: "", alt: "x" },
  },
}
const img: BlockImage = { url: "u", alt: "a", focal: { x: 0.5, y: 0.5 }, fit: "cover" }

test("textOf returns the saved value", () => assert.equal(textOf(blocks, "home.hero", "title", "x"), "Pão"))
test("textOf falls back on blank", () => assert.equal(textOf(blocks, "home.hero", "lead", "x"), "x"))
test("textOf falls back on an empty string", () => assert.equal(textOf({ a: { b: "" } }, "a", "b", "x"), "x"))
test("textOf falls back on a missing block", () => assert.equal(textOf({}, "home.hero", "title", "x"), "x"))
test("textOf falls back on a missing field", () => assert.equal(textOf(blocks, "home.hero", "nope", "x"), "x"))
test("textOf falls back on a non-string", () => assert.equal(textOf({ a: { b: 3 } }, "a", "b", "x"), "x"))
test("htmlOf returns saved html", () => assert.equal(htmlOf(blocks, "home.hero", "body", "f"), "<p>Olá</p>"))
test("htmlOf falls back on blank", () => assert.equal(htmlOf(blocks, "home.hero", "lead", "f"), "f"))
test("linkOf returns a complete link", () => assert.deepEqual(linkOf(blocks, "home.hero", "cta", { label: "F", href: "/f" }), { label: "Ver", href: "/menu" }))
test("linkOf falls back on a blank label", () => assert.deepEqual(linkOf(blocks, "home.hero", "badCta", { label: "F", href: "/f" }), { label: "F", href: "/f" }))
test("linkOf falls back when missing", () => assert.deepEqual(linkOf({}, "a", "b", { label: "F", href: "/f" }), { label: "F", href: "/f" }))
test("listOf returns saved items only", () =>
  assert.deepEqual(listOf(blocks, "home.hero", "steps", [{ label: "Z" }, { label: "Y" }]), [{ label: "A" }]))
test("listOf returns more saved items than the fallback", () =>
  assert.deepEqual(listOf({ a: { l: [1, 2, 3] } }, "a", "l", [9]), [1, 2, 3]))
test("listOf falls back on empty", () => assert.deepEqual(listOf(blocks, "home.hero", "none", [1]), [1]))
test("listOf falls back on missing or non-array", () => {
  assert.deepEqual(listOf({}, "a", "l", [1]), [1])
  assert.deepEqual(listOf({ a: { l: "x" } }, "a", "l", [1]), [1])
})
test("imageOf returns a normalised image", () => {
  const image = imageOf(blocks, "home.hero", "photo")
  assert.deepEqual(image, { url: "https://x.public.blob.vercel-storage.com/a.jpg", alt: "A", width: 800, height: 600, focal: { x: 0.2, y: 0.8 }, fit: "contain", aspect: "4:3" })
})
test("imageOf is null without a url", () => {
  assert.equal(imageOf(blocks, "home.hero", "noUrl"), null)
  assert.equal(imageOf(blocks, "home.hero", "emptyUrl"), null)
  assert.equal(imageOf(blocks, "home.hero", "title"), null)
  assert.equal(imageOf({}, "a", "b"), null)
})
test("imageOf defaults focal and fit", () => {
  const image = imageOf({ a: { b: { url: "u" } } }, "a", "b")
  assert.deepEqual(image?.focal, { x: 0.5, y: 0.5 })
  assert.equal(image?.fit, "cover")
  assert.equal(image?.alt, "")
})
test("imageOf clamps focal", () => {
  const image = imageOf({ a: { b: { url: "u", focal: { x: -3, y: 9 } } } }, "a", "b")
  assert.deepEqual(image?.focal, { x: 0, y: 1 })
})
test("imageStyle: focal 0/1 gives 0% 100%", () => assert.equal(imageStyle({ ...img, focal: { x: 0, y: 1 } }).objectPosition, "0% 100%"))
test("imageStyle: no aspect gives no aspectRatio key", () => assert.equal("aspectRatio" in imageStyle(img), false))
test("imageStyle: 4:3 gives '4 / 3'", () => assert.equal(imageStyle({ ...img, aspect: "4:3" }).aspectRatio, "4 / 3"))
test("imageStyle: unparseable aspect gives no aspectRatio key", () => {
  for (const aspect of ["wide", "4:0", "a:b", ""]) assert.equal("aspectRatio" in imageStyle({ ...img, aspect }), false)
})
test("imageStyle: a bad focal falls back to 50% 50%", () => {
  const style = imageStyle({ ...img, focal: { x: NaN, y: undefined } as unknown as BlockImage["focal"] })
  assert.equal(style.objectPosition, "50% 50%")
  assert.ok(!JSON.stringify(style).includes("NaN"))
})
test("imageStyle: rounds percentages", () =>
  assert.equal(imageStyle({ ...img, focal: { x: 0.333333, y: 0.6666 } }).objectPosition, "33% 67%"))
test("imageStyle: object-fit follows fit", () => assert.equal(imageStyle({ ...img, fit: "contain" }).objectFit, "contain"))
test("attribute helpers", () => {
  assert.deepEqual(blockAttrs("home.hero"), { "data-cd-block": "home.hero" })
  assert.deepEqual(fieldAttrs("title"), { "data-cd-field": "title" })
  assert.deepEqual(itemAttrs(2), { "data-cd-item": 2 })
})

const photo = (url: string) => ({ url, focal: { x: 0.1, y: 0.9 } })
const lists = {
  "home.gallery": {
    images: [{ image: photo("a") }, {}, { image: { alt: "no url" } }, null, { image: photo("e") }],
    empty: [],
    text: "x",
  },
}
test("listImagesOf keeps items with an image, with their list position", () => {
  const found = listImagesOf(lists, "home.gallery", "images", "image")
  assert.deepEqual(found.map((f) => [f.index, f.image.url]), [[0, "a"], [4, "e"]])
  assert.deepEqual(found[0].image.focal, { x: 0.1, y: 0.9 })
})
test("listImagesOf is empty for an empty, missing or non-list field", () => {
  assert.deepEqual(listImagesOf(lists, "home.gallery", "empty", "image"), [])
  assert.deepEqual(listImagesOf(lists, "home.gallery", "text", "image"), [])
  assert.deepEqual(listImagesOf({}, "home.gallery", "images", "image"), [])
})
test("itemImageOf returns the image of one item, else null", () => {
  assert.equal(itemImageOf(lists, "home.gallery", "images", 4, "image")?.url, "e")
  assert.equal(itemImageOf(lists, "home.gallery", "images", 1, "image"), null)
  assert.equal(itemImageOf(lists, "home.gallery", "images", 2, "image"), null)
  assert.equal(itemImageOf(lists, "home.gallery", "images", 3, "image"), null)
  assert.equal(itemImageOf(lists, "home.gallery", "images", 9, "image"), null)
  assert.equal(itemImageOf({}, "home.gallery", "images", 0, "image"), null)
})

test("itemsOf returns the served array, empty included, and undefined otherwise", () => {
  assert.deepEqual(itemsOf({ "home.faq": { list: [{ slug: "a" }] } }, "home.faq", "list"), [{ slug: "a" }])
  // An empty array is the owner's choice to show nothing, not a reason to fall back.
  assert.deepEqual(itemsOf({ "home.faq": { list: [] } }, "home.faq", "list"), [])
  assert.equal(itemsOf({ "home.faq": {} }, "home.faq", "list"), undefined)
  assert.equal(itemsOf({}, "home.faq", "list"), undefined)
  assert.equal(itemsOf({ "home.faq": { list: "x" } }, "home.faq", "list"), undefined)
  assert.equal(itemsOf(undefined as unknown as Record<string, Record<string, unknown>>, "home.faq", "list"), undefined)
})
test("settingOf returns a filled string only", () => {
  assert.equal(settingOf({ "home.hero": { lead: "Olá" } }, "home.hero", "lead"), "Olá")
  assert.equal(settingOf({ "home.hero": { lead: "  " } }, "home.hero", "lead"), undefined)
  assert.equal(settingOf({ "home.hero": { lead: "" } }, "home.hero", "lead"), undefined)
  assert.equal(settingOf({ "home.hero": { lead: [] } }, "home.hero", "lead"), undefined)
  assert.equal(settingOf({}, "home.hero", "lead"), undefined)
})
test("itemAttrs marks an item by slug", () => {
  assert.deepEqual(itemAttrs("restauro"), { "data-cd-item": "restauro" })
})
