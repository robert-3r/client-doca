import "./ConfigureAuth.scss";
import { useTheme } from "../../hooks";
import { Logout } from "../Logout";

export const ConfigureAuth = ({ onOpenConfigureModal }) => {
  const { theme, toggleTheme } = useTheme();

  const onConfigure = () => {
    toggleTheme();
    onOpenConfigureModal();
  };

  return (
    <div className="configure-auth">
      <div className="configure-auth__theme">
        <p>Selecciona un tema</p>
        <select value={theme} onChange={onConfigure}>
          <option value="light">Claro</option>
          <option value="dark">Oscuro</option>
        </select>
      </div>
      <div className="configure-auth__logout">
        <Logout />
      </div>
    </div>
  );
};
