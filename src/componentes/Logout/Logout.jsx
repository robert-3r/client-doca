import { useAuth } from "../../hooks";
import { FiLogOut } from "react-icons/fi";
import "./Logout.scss";

export const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => logout();

  return (
    <button className="btn-logout" onClick={handleLogout}>
      Cerrar sesion <FiLogOut />
    </button>
  );
};
