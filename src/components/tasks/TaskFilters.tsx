import type { TaskPriority, TaskStatus } from "../../types";

interface TaskFiltersProps {
  statusFilter: TaskStatus | "ALL";
  priorityFilter: TaskPriority | "ALL";
  onStatusChange: (status: TaskStatus | "ALL") => void;
  onPriorityChange: (priority: TaskPriority | "ALL") => void;
}

const statusOptions: Array<{ value: TaskStatus | "ALL"; label: string }> = [
  { value: "ALL", label: "Todos os status" },
  { value: "PENDING", label: "Pendente" },
  { value: "IN_PROGRESS", label: "Em andamento" },
  { value: "DONE", label: "Concluída" },
];

const priorityOptions: Array<{ value: TaskPriority | "ALL"; label: string }> =
  [
    { value: "ALL", label: "Todas as prioridades" },
    { value: "LOW", label: "Baixa" },
    { value: "MEDIUM", label: "Média" },
    { value: "HIGH", label: "Alta" },
  ];

export function TaskFilters({
  statusFilter,
  priorityFilter,
  onStatusChange,
  onPriorityChange,
}: TaskFiltersProps): JSX.Element {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value as TaskStatus | "ALL")}
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        {statusOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <select
        value={priorityFilter}
        onChange={(e) =>
          onPriorityChange(e.target.value as TaskPriority | "ALL")
        }
        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        {priorityOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
