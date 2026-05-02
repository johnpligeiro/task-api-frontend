import { useState } from "react";
import { Calendar, Edit2, Trash2 } from "lucide-react";
import { StatusBadge, PriorityBadge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { TaskForm } from "./TaskForm";
import { formatDate, isOverdue } from "../../utils/date";
import { useUpdateTask, useUpdateTaskStatus, useDeleteTask } from "../../hooks/useTasks";
import { cn } from "../../utils/cn";
import type { Task, TaskRequest, TaskStatus } from "../../types";

interface TaskCardProps {
  task: Task;
}

const statusOptions: Array<{ value: TaskStatus; label: string }> = [
  { value: "PENDING", label: "Pendente" },
  { value: "IN_PROGRESS", label: "Em andamento" },
  { value: "DONE", label: "Concluída" },
];

export function TaskCard({ task }: TaskCardProps ) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const updateTask = useUpdateTask();
  const updateStatus = useUpdateTaskStatus();
  const deleteTask = useDeleteTask();

  const overdue =
    task.dueDate && task.status !== "DONE" && isOverdue(task.dueDate);

  const handleEdit = (data: TaskRequest) => {
    updateTask.mutate(
      { id: task.id, data },
      { onSuccess: () => setIsEditOpen(false) }
    );
  };

  const handleDelete = () => {
    deleteTask.mutate(task.id, {
      onSuccess: () => setIsDeleteOpen(false),
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateStatus.mutate({
      id: task.id,
      data: { status: e.target.value as TaskStatus },
    });
  };

  return (
    <>
      <article
        className={cn(
          "flex flex-col gap-3 rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md",
          task.status === "DONE" && "opacity-75",
          overdue && "border-red-200"
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className={cn(
              "text-sm font-semibold text-gray-900 leading-snug",
              task.status === "DONE" && "line-through text-gray-500"
            )}
          >
            {task.title}
          </h3>
          <div className="flex shrink-0 gap-1">
            <button
              onClick={() => setIsEditOpen(true)}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600"
              aria-label="Editar tarefa"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600"
              aria-label="Remover tarefa"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-gray-500 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
        </div>

        {/* Due date */}
        {task.dueDate && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs",
              overdue ? "text-red-600 font-medium" : "text-gray-500"
            )}
          >
            <Calendar className="h-3 w-3" />
            <span>
              {overdue ? "Vencida em " : "Vence em "}
              {formatDate(task.dueDate)}
            </span>
          </div>
        )}

        {/* Status changer */}
        <div className="border-t border-gray-100 pt-3">
          <select
            value={task.status}
            onChange={handleStatusChange}
            disabled={updateStatus.isPending}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-xs text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </article>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Editar tarefa"
        size="lg"
      >
        <TaskForm
          onSubmit={handleEdit}
          isLoading={updateTask.isPending}
          defaultValues={task}
          onCancel={() => setIsEditOpen(false)}
        />
      </Modal>

      {/* Delete Confirm Modal */}
      <Modal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        title="Remover tarefa"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Tem certeza que deseja remover{" "}
            <strong className="text-gray-900">"{task.title}"</strong>? Esta
            ação não pode ser desfeita.
          </p>
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={() => setIsDeleteOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              isLoading={deleteTask.isPending}
              onClick={handleDelete}
            >
              Remover
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
