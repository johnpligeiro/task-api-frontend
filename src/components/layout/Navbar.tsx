import { CheckSquare, LogOut, User } from "lucide-react";
import { useAuthStore } from "../../store/authStore";
import { useLogout } from "../../hooks/useAuth";
import { Button } from "../ui/Button";

export function Navbar( ) {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
            <CheckSquare className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Task App</span>
        </div>

        {/* User info + logout */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role === "ADMIN" ? "Administrador" : "Usuário"}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            leftIcon={<LogOut className="h-4 w-4" />}
          >
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
