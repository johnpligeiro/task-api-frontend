import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthCard } from "../components/auth/AuthCard";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useLogin } from "../hooks/useAuth";
import type { LoginRequest } from "../types";

const loginSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginPage( ) {
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (values: LoginFormValues) => {
    const payload: LoginRequest = {
      email: values.email,
      password: values.password,
    };
    login.mutate(payload);
  };

  return (
    <AuthCard
      title="Entrar na conta"
      subtitle="Informe suas credenciais para acessar"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          placeholder="••••••••"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <Button
          type="submit"
          className="w-full"
          size="lg"
          isLoading={login.isPending}
        >
          Entrar
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Não tem uma conta?{" "}
        <Link
          to="/register"
          className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
        >
          Criar conta
        </Link>
      </p>
    </AuthCard>
  );
}
