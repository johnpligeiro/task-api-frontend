import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { getTodayString } from "../../utils/date";
import type { Task, TaskRequest } from "../../types";

const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Título deve ter no mínimo 3 caracteres")
    .max(100, "Título muito longo"),
  description: z.string().optional(),
  status: z.enum(["PENDING", "IN_PROGRESS", "DONE"]),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  dueDate: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        return val >= getTodayString();
      },
      { message: "Data de vencimento não pode ser no passado" }
    ),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskFormProps {
  onSubmit: (data: TaskRequest) => void;
  isLoading: boolean;
  defaultValues?: Task;
  onCancel: () => void;
}

export function TaskForm({
  onSubmit,
  isLoading,
  defaultValues,
  onCancel,
}: TaskFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "PENDING",
      priority: "MEDIUM",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset({
        title: defaultValues.title,
        description: defaultValues.description ?? "",
        status: defaultValues.status,
        priority: defaultValues.priority,
        dueDate: defaultValues.dueDate ?? "",
      });
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = (values: TaskFormValues) => {
    const payload: TaskRequest = {
      title: values.title,
      status: values.status,
      priority: values.priority,
      description: values.description || undefined,
      dueDate: values.dueDate || undefined,
    };
    onSubmit(payload);
  };

  const selectClass =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        label="Título"
        placeholder="Nome da tarefa"
        error={errors.title?.message}
        {...register("title")}
      />

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          rows={3}
          placeholder="Descrição opcional"
          className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          {...register("description")}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select className={selectClass} {...register("status")}>
            <option value="PENDING">Pendente</option>
            <option value="IN_PROGRESS">Em andamento</option>
            <option value="DONE">Concluída</option>
          </select>
          {errors.status && (
            <p className="text-xs text-red-600">{errors.status.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Prioridade
          </label>
          <select className={selectClass} {...register("priority")}>
            <option value="LOW">Baixa</option>
            <option value="MEDIUM">Média</option>
            <option value="HIGH">Alta</option>
          </select>
          {errors.priority && (
            <p className="text-xs text-red-600">{errors.priority.message}</p>
          )}
        </div>
      </div>

      <Input
        label="Data de vencimento"
        type="date"
        min={getTodayString()}
        error={errors.dueDate?.message}
        {...register("dueDate")}
      />

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {defaultValues ? "Salvar alterações" : "Criar tarefa"}
        </Button>
      </div>
    </form>
  );
}
