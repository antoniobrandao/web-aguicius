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

export type ContentIconName = keyof typeof contentIcons;

export const contentIconOptions: { value: ContentIconName; label: string }[] = [
  { value: "truck", label: "Camião" },
  { value: "wrench", label: "Ferramenta" },
  { value: "packageCheck", label: "Entrega validada" },
  { value: "hammer", label: "Martelo" },
  { value: "boxes", label: "Caixas" },
  { value: "warehouse", label: "Armazém" },
  { value: "arrowDownToLine", label: "Recolha" },
  { value: "zap", label: "Express" },
  { value: "clock", label: "Relógio" },
  { value: "shieldCheck", label: "Garantia" },
];

export function getContentIcon(name: ContentIconName): LucideIcon {
  return contentIcons[name];
}
