import { cn } from "../../utils/cn";
import type { TaskPriority, TaskStatus } from "../../types";

type BadgeVariant =
  | "gray"
  | "blue"
  | "green"
  | "yellow"
  | "red"
  | "purple"
  | "orange";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  gray: "bg-gray-100 text-gray-700",
  blue: "bg-blue-100 text-blue-700",
  green: "bg-green-100 text-green-700",
  yellow: "bg-yellow-100 text-yellow-700",
  red: "bg-red-100 text-red-700",
  purple: "bg-purple-100 text-purple-700",
  orange: "bg-orange-100 text-orange-700",
};

export function Badge({
  children,
  variant = "gray",
  className,
}: BadgeProps): JSX.Element {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({
  status,
}: {
  status: TaskStatus;
}): JSX.Element {
  const map: Record<TaskStatus, { label: string; variant: BadgeVariant }> = {
    PENDING: { label: "Pendente", variant: "yellow" },
    IN_PROGRESS: { label: "Em andamento", variant: "blue" },
    DONE: { label: "Concluída", variant: "green" },
  };
  const { label, variant } = map[status];
  return <Badge variant={variant}>{label}</Badge>;
}

export function PriorityBadge({
  priority,
}: {
  priority: TaskPriority;
}): JSX.Element {
  const map: Record<TaskPriority, { label: string; variant: BadgeVariant }> = {
    LOW: { label: "Baixa", variant: "gray" },
    MEDIUM: { label: "Média", variant: "orange" },
    HIGH: { label: "Alta", variant: "red" },
  };
  const { label, variant } = map[priority];
  return <Badge variant={variant}>{label}</Badge>;
}
