import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { api } from "./../services/api";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  email: string;
  cpf: string;
  tipoConta: string;
  github: string;
  adminId: string;
  empresaId: string;
  candidatoId: string;
  empresa: Empresa;
};

type Empresa = {
  id: string;
  razaoSocial: string;
  cnpj: string;
};

type SignInCredentials = {
  email: string;
  senha: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user?: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function DestroyCookies() {
  destroyCookie(null, "ventura.token", {
    path: "/",
  });
}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    (async () => {
      const { "ventura.token": token } = parseCookies();

      if (token) {
        api
          .get("usuario-autenticado")
          .then((response) => {
            const {
              id,
              nome,
              endereco,
              telefone,
              email,
              cpf,
              tipoConta,
              github,
              adminId,
              empresaId,
              candidatoId,
              empresa,
            } = response.data;

            setUser({
              id,
              nome,
              endereco,
              telefone,
              email,
              cpf,
              tipoConta,
              github,
              adminId,
              empresaId,
              candidatoId,
              empresa,
            });
          })
          .catch(() => {
            destroyCookie(null, "ventura.token", {
              path: "/",
            });
            navigate("/login");
          });
      }
    })();
  }, []);

  async function signIn({ email, senha }: SignInCredentials) {
    try {
      const response = await api.post("/authenticate/", {
        email,
        senha,
      });

      const { token } = response.data;

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      api
        .get("usuario-autenticado")
        .then((response) => {
          const {
            id,
            nome,
            endereco,
            telefone,
            email,
            cpf,
            tipoConta,
            github,
            adminId,
            empresaId,
            candidatoId,
            empresa,
          } = response.data;
          setUser({
            id,
            nome,
            endereco,
            telefone,
            email,
            cpf,
            tipoConta,
            github,
            adminId,
            empresaId,
            candidatoId,
            empresa,
          });
        })
        .catch(() => {
          destroyCookie(undefined, "ventura.token");
          navigate("/login");
        });

      setCookie(undefined, "ventura.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });

      navigate("/dashboard/vagas-publicadas");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
