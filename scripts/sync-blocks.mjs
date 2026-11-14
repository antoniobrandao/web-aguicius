// Declares this site's blocks to Casa Digital: PUT casadigital.blocks.json.
// Run by hand after changing the manifest, never from a preview build.
//   yarn blocks:sync   (reads SITE_API_KEY from .env.local)
import { readFile } from "node:fs/promises"

const base = process.env.CASADIGITAL_URL ?? "https://www.casadigital.pt"
const key = process.env.SITE_API_KEY
if (!key) {
  console.error("SITE_API_KEY is not set")
  process.exit(1)
}

const body = await readFile(new URL("../casadigital.blocks.json", import.meta.url), "utf8")
const response = await fetch(`${base}/api/v1/blocks/definitions`, {
  method: "PUT",
  headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
  body,
})
console.log(response.status, await response.text())
if (response.status !== 200) process.exit(1)
