import { TaskCard } from "./TaskCard";
import { Spinner } from "../ui/Spinner";
import { EmptyState } from "../ui/EmptyState";
import type { Task } from "../../types";

interface TaskListProps {
  tasks: Task[];
  isLoading: boolean;
  isError: boolean;
  onCreateClick: () => void;
}

function TaskSkeleton(): JSX.Element {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-3 h-4 w-3/4 animate-pulse rounded bg-gray-200" />
      <div className="mb-3 h-3 w-full animate-pulse rounded bg-gray-100" />
      <div className="mb-4 flex gap-2">
        <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200" />
        <div className="h-5 w-16 animate-pulse rounded-full bg-gray-200" />
      </div>
      <div className="h-7 w-full animate-pulse rounded-lg bg-gray-100" />
    </div>
  );
}

export function TaskList({
  tasks,
  isLoading,
  isError,
  onCreateClick,
}: TaskListProps): JSX.Element {
  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <TaskSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm text-red-600 font-medium">
          Erro ao carregar tarefas. Tente recarregar a página.
        </p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        title="Nenhuma tarefa encontrada"
        description="Crie sua primeira tarefa ou ajuste os filtros para ver mais resultados."
        actionLabel="Criar tarefa"
        onAction={onCreateClick}
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
