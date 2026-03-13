import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/authStore";
import Dropdown from "../../ui/Dropdown";
import { useLogout } from "../../../hooks/useUserAuth";
import { LogOut, Ticket, User2 } from "lucide-react";

export default function UserMenu() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  console.log("UserMenu user:", user);

  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <Dropdown
      trigger={
        <img
          src={"/new-user.png"}
          alt="profile"
          className="w-10 h-10 rounded-full border border-border hover:ring-2 hover:ring-primary p-0.5 cursor-pointer object-contain"
        />
      }
      align="right"
      classname="min-w-40"
    >
      <div className="p-2">
        {/* User Info */}
        <div className="px-3 pt-2 pb-4 border-b border-border">
          <p className="text-sm text-text-primary font-medium">{user?.name}</p>
          <p className="text-xs text-text-muted truncate">{user?.email}</p>
        </div>

        {/* Actions */}
        <div className="mt-2 space-y-1">
          <button
            onClick={() => navigate("/profile")}
            className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:bg-primary/10 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <User2 size={18} />
              <span>Profile</span>
            </div>
          </button>

          <button
            onClick={() => navigate("/my-tickets")}
            className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:bg-primary/10 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Ticket size={18} />
              <span>My Movie Tickets</span>
            </div>
          </button>

          <button
            onClick={() => navigate("/my-event-tickets")}
            className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:bg-primary/10 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <Ticket size={18} />
              <span>My Events Tickets</span>
            </div>
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2 text-sm text-danger hover:bg-danger/10 rounded-lg"
          >
            <div className="flex items-center gap-2">
              <LogOut size={18} />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
    </Dropdown>
  );
}
