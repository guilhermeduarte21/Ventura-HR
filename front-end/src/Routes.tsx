import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { VagasCreate } from "./components/Vagas/create";
import { NotFound } from "./pages/NotFound";
import { CadastroCandidato } from "./pages/CadastroCandidato";
import { parseCookies } from "nookies";
import { ListaVagas } from "./components/Vagas/ListaVagas";
import { ListaUsuariosEmpresas } from "./components/UsuariosEmpresas/ListaUsuariosEmpresas";
import { ListaUsuariosCandidatos } from "./components/UsuariosCandidatos/ListaUsuariosCandidatos";
import { CadastroEmpresa } from "./components/UsuariosEmpresas/CadastroEmpresa";
import { VagaDetalhada } from "./components/Vagas/VagaDetalhada";
import { Perfil } from "./components/Perfil/Perfil";
import { EditarPerfil } from "./components/Perfil/EditarPerfil";

function RequireAuth({ children }: { children: JSX.Element }) {
  const { "ventura.token": token } = parseCookies();
  const isAuthenticated = !!token;

  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function NotRequireAuth({ children }: { children: JSX.Element }) {
  const { "ventura.token": token } = parseCookies();
  const isAuthenticated = !!token;
  let location = useLocation();

  if (isAuthenticated) {
    return (
      <Navigate to="/dashboard/vagas-publicadas" state={{ from: location }} />
    );
  }

  return children;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <NotRequireAuth>
            <Home />
          </NotRequireAuth>
        }
      />
      <Route path="cadastro-candidato" element={<CadastroCandidato />} />

      <Route
        path="dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      >
        <Route
          path="vagas-publicadas"
          element={
            <RequireAuth>
              <ListaVagas title="Vagas publicadas" />
            </RequireAuth>
          }
        />
        <Route
          path="usuarios-empresas"
          element={
            <RequireAuth>
              <ListaUsuariosEmpresas />
            </RequireAuth>
          }
        />
        <Route
          path="usuarios-candidatos"
          element={
            <RequireAuth>
              <ListaUsuariosCandidatos />
            </RequireAuth>
          }
        />
        <Route
          path="cadastrar-novo-candidato"
          element={
            <RequireAuth>
              <CadastroCandidato />
            </RequireAuth>
          }
        />
        <Route
          path="cadastrar-nova-empresa"
          element={
            <RequireAuth>
              <CadastroEmpresa />
            </RequireAuth>
          }
        />
        <Route
          path="nova-vaga"
          element={
            <RequireAuth>
              <VagasCreate />
            </RequireAuth>
          }
        />
        <Route
          path="detalhar-vaga/:vagaId"
          element={
            <RequireAuth>
              <VagaDetalhada />
            </RequireAuth>
          }
        />
        <Route
          path="perfil"
          element={
            <RequireAuth>
              <Perfil />
            </RequireAuth>
          }
        >
          <Route
            path="editar"
            element={
              <RequireAuth>
                <EditarPerfil />
              </RequireAuth>
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
