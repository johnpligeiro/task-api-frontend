import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { TaskList } from "../components/tasks/TaskList";
import { TaskForm } from "../components/tasks/TaskForm";
import { TaskFilters } from "../components/tasks/TaskFilters";
import { useTasks, useCreateTask } from "../hooks/useTasks";
import type { TaskPriority, TaskRequest, TaskStatus } from "../types";

export function TasksPage(): JSX.Element {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "ALL">("ALL");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "ALL">(
    "ALL"
  );

  const { data: tasks = [], isLoading, isError } = useTasks();
  const createTask = useCreateTask();

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = statusFilter === "ALL" || task.status === statusFilter;
    const priorityMatch =
      priorityFilter === "ALL" || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  const handleCreate = (data: TaskRequest) => {
    createTask.mutate(data, {
      onSuccess: () => setIsCreateOpen(false),
    });
  };

  return (
    <section>
      {/* Page header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Minhas Tarefas</h1>
          <p className="mt-1 text-sm text-gray-500">
            {tasks.length === 0
              ? "Nenhuma tarefa ainda"
              : `${filteredTasks.length} de ${tasks.length} tarefa${tasks.length !== 1 ? "s" : ""}`}
          </p>
        </div>

        <Button
          onClick={() => setIsCreateOpen(true)}
          leftIcon={<Plus className="h-4 w-4" />}
        >
          Nova tarefa
        </Button>
      </div>

      {/* Filters */}
      {tasks.length > 0 && (
        <div className="mb-6">
          <TaskFilters
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            onStatusChange={setStatusFilter}
            onPriorityChange={setPriorityFilter}
          />
        </div>
      )}

      {/* Task list */}
      <TaskList
        tasks={filteredTasks}
        isLoading={isLoading}
        isError={isError}
        onCreateClick={() => setIsCreateOpen(true)}
      />

      {/* Create task modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Nova tarefa"
        size="lg"
      >
        <TaskForm
          onSubmit={handleCreate}
          isLoading={createTask.isPending}
          onCancel={() => setIsCreateOpen(false)}
        />
      </Modal>
    </section>
  );
}
