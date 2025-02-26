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

export interface OptionItem {
  value: string;
  label: string;
  icon: LucideIcon;
  variantColor?: string;
}

export const PRIORITY_OPTIONS: OptionItem[] = [
  {
    value: "none",
    label: "None",
    icon: CircleOffIcon,
    variantColor:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  },
  {
    value: "low",
    label: "Low",
    icon: ArrowDownIcon,
    variantColor: "bg-success text-success-foreground hover:bg-success/80",
  },
  {
    value: "medium",
    label: "Medium",
    icon: MinusIcon,
    variantColor: "bg-alert text-alert-foreground hover:bg-alert/80",
  },
  {
    value: "high",
    label: "High",
    icon: ArrowUpIcon,
    variantColor:
      "bg-high-alert text-high-alert-foreground hover:bg-high-alert/80",
  },
  {
    value: "urgent",
    label: "Urgent",
    icon: AlertTriangleIcon,
    variantColor:
      "bg-destructive text-destructive-foreground hover:bg-destructive/80",
  },
];

export const STATUS_OPTIONS: OptionItem[] = [
  {
    value: "not_started",
    label: "Not Started",
    icon: CircleIcon,
    variantColor:
      "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  },
  {
    value: "in_progress",
    label: "In Progress",
    icon: EllipsisIcon,
    variantColor: "bg-alert text-alert-foreground hover:bg-alert/80",
  },
  {
    value: "completed",
    label: "Completed",
    icon: CircleCheckIcon,
    variantColor: "bg-success text-success-foreground hover:bg-success/80",
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
