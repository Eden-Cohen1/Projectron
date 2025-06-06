import {
  LayoutDashboard,
  FormInput,
  Table,
  BarChart2,
  Menu,
  Square,
  CreditCard,
  Box,
  List,
  AlertCircle,
  ClipboardCheck,
  Mail,
  BellRing,
  SlidersHorizontal,
  Monitor,
  Component,
  MousePointerClick,
} from "lucide-react";

export const componentTypes = [
  "form",
  "table",
  "chart",
  "navigation",
  "card",
  "modal",
  "button",
  "input",
  "dropdown",
  "tab",
  "carousel",
  "list",
  "menu",
  "sidebar",
  "footer",
  "header",
  "authentication",
  "notification",
  "widget",
  "custom",
];

export const componentTypeIcons: Record<string, any> = {
  form: FormInput,
  table: Table,
  chart: BarChart2,
  navigation: Menu,
  card: CreditCard,
  modal: Monitor,
  button: MousePointerClick,
  input: FormInput,
  dropdown: SlidersHorizontal,
  tab: LayoutDashboard,
  carousel: Box,
  list: List,
  menu: Menu,
  sidebar: Square,
  footer: LayoutDashboard,
  header: LayoutDashboard,
  authentication: AlertCircle,
  notification: BellRing,
  widget: ClipboardCheck,
  dashboard: LayoutDashboard,
  email: Mail,
  default: Component,
};

export const userTypes = [
  "admin",
  "user",
  "guest",
  "developer",
  "manager",
  "all",
];
