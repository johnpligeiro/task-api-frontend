import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthCard } from "../components/auth/AuthCard";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useRegister } from "../hooks/useAuth";
import type { RegisterRequest } from "../types";

const registerSchema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
    password: z
      .string()
      .min(8, "Senha deve ter no mínimo 8 caracteres"),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterPage(): JSX.Element {
  const register_ = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (values: RegisterFormValues) => {
    const payload: RegisterRequest = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    register_.mutate(payload);
  };

  return (
    <AuthCard
      title="Criar conta"
      subtitle="Preencha os dados para começar"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nome completo"
          type="text"
          placeholder="João Silva"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />

        <Input
          label="Email"
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <Input
          label="Senha"
          type="password"
          placeholder="Mínimo 8 caracteres"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Input
          label="Confirmar senha"
          type="password"
          placeholder="Repita a senha"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          isLoading={register_.isPending}
        >
          Criar conta
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Já tem uma conta?{" "}
        <Link
          to="/login"
          className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          Entrar
        </Link>
      </p>
    </AuthCard>
  );
}
