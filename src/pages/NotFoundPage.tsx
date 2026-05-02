import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export function NotFoundPage(): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <p className="text-6xl font-bold text-blue-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-gray-900">
        Página não encontrada
      </h1>
      <p className="mt-2 text-gray-500">
        A página que você tentou acessar não existe.
      </p>
      <Link to="/tasks" className="mt-6">
        <Button>Voltar para tarefas</Button>
      </Link>
    </div>
  );
}
