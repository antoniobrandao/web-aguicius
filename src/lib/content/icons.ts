import {
  ArrowDownToLine,
  Boxes,
  Clock,
  Hammer,
  PackageCheck,
  ShieldCheck,
  Truck,
  Warehouse,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

import type { ContentIconKey } from "./constants";

export const contentIcons = {
  truck: Truck,
  wrench: Wrench,
  packageCheck: PackageCheck,
  hammer: Hammer,
  boxes: Boxes,
  warehouse: Warehouse,
  arrowDownToLine: ArrowDownToLine,
  zap: Zap,
  clock: Clock,
  shieldCheck: ShieldCheck,
} as const satisfies Record<string, LucideIcon>;

export type ContentIconName = ContentIconKey;

export function getContentIcon(name: ContentIconName): LucideIcon {
  return contentIcons[name];
}
