import { Route, Routes, Navigate } from "react-router-dom";
import { WepApp } from "../pages";
import { Login, Register } from "../componentes";
import { useAuth } from "../hooks";

export const MainRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="/" element={<Login />} />
          <Route path="register" element={<Register />} />
        </>
      ) : (
        <>
          <Route path="/app" element={<WepApp />} />
          <Route path="*" element={<Navigate to="/app" />} />
        </>
      )}
      {!user && <Route path="*" element={<Navigate to="/" />} />}
    </Routes>
  );
};
