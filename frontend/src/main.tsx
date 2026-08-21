import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Cadastro from "./pages/Cadastro.tsx";
import Noticia from "./pages/Noticia.tsx";
import Times from "./pages/Times.tsx";
import Perfil from "./pages/Perfil.tsx";
import NoticiaForm from "./pages/NoticiaForm.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Jogadores from "./pages/Jogadores.tsx";
import PublicRoute from "./components/PublicRoute.tsx";
import Adm from "./pages/Adm.tsx";
import PrivateRouteAdm from "./components/PrivateRouteAdm.tsx";
import JogadorForm from "./pages/JogadorForm.tsx";
import TimeForm from "./pages/TimeForm.tsx";
import PartidaForm from "./pages/PartidaForm.tsx";
import MVPForm from "./pages/MVPForm.tsx";
import NoticiaEdit from "./pages/NoticiaEdit.tsx";
import TimeEdit from "./pages/TimeEdit.tsx";
import JogadorEdit from "./pages/JogadorEdit.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import UserEdit from "./pages/UserEdit.tsx";
import PartidaEdit from "./pages/PartidaEdit.tsx";
import MVPEdit from "./pages/MVPEdit.tsx";


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <PublicRoute><Login /></PublicRoute>,
      },
      {
        path: "/cadastro",
        element: <PublicRoute><Cadastro /></PublicRoute>,
      },
      {
        path: "/admarea",
        element: <PrivateRouteAdm><Adm/></PrivateRouteAdm>
      },
      {
        path: "/notice/create",
        element: <PrivateRouteAdm><NoticiaForm /></PrivateRouteAdm>
      },
      {
        path: "/notice/edit/:id",
        element: <PrivateRouteAdm><NoticiaEdit /></PrivateRouteAdm>
      },
      {
        path: "/jogador/create",
        element: <PrivateRouteAdm><JogadorForm/></PrivateRouteAdm>
      },
      {
        path: "/jogador/edit/:id",
        element: <PrivateRouteAdm><JogadorEdit/></PrivateRouteAdm>
      },
      {
        path: "/time/create",
        element: <PrivateRouteAdm><TimeForm/></PrivateRouteAdm>
      },
      {
        path: "/time/edit/:id",
        element: <PrivateRouteAdm><TimeEdit/></PrivateRouteAdm>
      },
      {
        path: "/partida/create",
        element: <PrivateRouteAdm><PartidaForm/></PrivateRouteAdm>
      },
      {
        path: "/partida/edit/:id",
        element: <PrivateRouteAdm><PartidaEdit/></PrivateRouteAdm>
      },
      {
        path: "/mvp/create",
        element: <PrivateRouteAdm><MVPForm/></PrivateRouteAdm>
      },
      {
        path: "/mvp/edit/:id",
        element: <PrivateRouteAdm><MVPEdit/></PrivateRouteAdm>
      },
      {
        path: "/notice/:id",
        element: <Noticia />,
      },
      {
        path: "/times/:id",
        element: <Times />,
      },
      {
        path: "/jogadores",
        element: <Jogadores />,
      },
      {
        path: "/user/:id",
        element: <Perfil />,
      },
      {
        path: "/user/edit/:id",
        element: <PrivateRoute><UserEdit /></PrivateRoute>
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </QueryClientProvider>,
);
