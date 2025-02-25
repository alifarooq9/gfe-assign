import {
  AlertTriangleIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  BinaryIcon,
  CalendarIcon,
  CircleCheckIcon,
  CircleIcon,
  CircleOffIcon,
  EllipsisIcon,
  MinusIcon,
  SquareCheckIcon,
  SquareXIcon,
  TextIcon,
  type LucideIcon,
} from "lucide-react";
import { ClassNameValue } from "tailwind-merge";

export interface OptionItem {
  value: string;
  label: string;
  icon: LucideIcon;
  colorClassName?: string;
}

export const PRIORITY_OPTIONS: OptionItem[] = [
  {
    value: "none",
    label: "None",
    icon: CircleOffIcon,
    colorClassName:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  },
  {
    value: "low",
    label: "Low",
    icon: ArrowDownIcon,
    colorClassName: "bg-green-100 text-green-800 hover:bg-green-200",
  },
  {
    value: "medium",
    label: "Medium",
    icon: MinusIcon,
    colorClassName: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  },
  {
    value: "high",
    label: "High",
    icon: ArrowUpIcon,
    colorClassName: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  },
  {
    value: "urgent",
    label: "Urgent",
    icon: AlertTriangleIcon,
    colorClassName:
      "bg-destructive text-destructive-foreground hover:bg-destructive/80",
  },
];

export const STATUS_OPTIONS: OptionItem[] = [
  {
    value: "not_started",
    label: "Not Started",
    icon: CircleIcon,
    colorClassName:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  },
  {
    value: "in_progress",
    label: "In Progress",
    icon: EllipsisIcon,
    colorClassName: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  },
  {
    value: "completed",
    label: "Completed",
    icon: CircleCheckIcon,
    colorClassName: "bg-green-100 text-green-800 hover:bg-green-200",
  },
];

export const CUSTOM_FIELD_TYPES = [
  {
    value: "text",
    label: "Text",
    icon: TextIcon,
  },
  {
    value: "number",
    label: "Number",
    icon: BinaryIcon,
  },
  {
    value: "checkbox",
    label: "Checkbox",
    icon: SquareCheckIcon,
  },
  {
    value: "dateTime",
    label: "Date & Time",
    icon: CalendarIcon,
  },
];

export const CHECKBOX_OPTIONS = [
  { value: "true", label: "Checked", icon: SquareCheckIcon },
  { value: "false", label: "Un Checked", icon: SquareXIcon },
];
