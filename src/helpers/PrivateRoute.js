import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const AdminPrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdmin = useSelector((state) => state.user.isAdmin);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth', { state: { from: location } }); // Redirigir a la página de autenticación si no está logueado
    } else if (!isAdmin) {
      navigate('/');
    }
  }, [isLoggedIn, isAdmin, navigate, location]);

  return isLoggedIn && isAdmin ? children : null; // Si está logueado, renderiza los children, sino retorna null
};

export default AdminPrivateRoute;