import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/contextprovider";

export default function DefaultLayout() {
  const { user, token, setToken } = useStateContext();

  const onLogout = () => {
    setToken(null);
  };

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div id="defaultLayout">
      <div className="content">
        <header>
          <div>Autenticado</div>
          <div>
            {user?.username}
            <a href="#" onClick={onLogout} className="btn-logout">
              Sair
            </a>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
