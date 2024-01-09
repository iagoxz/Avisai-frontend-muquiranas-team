import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Cadastro from "./pages/Cadastro.jsx";
import Inicio from "./pages/Inicio.jsx";
import Perfil from "./pages/Perfil.jsx";
import Posts from "./pages/Posts.jsx";
import Favoritos from "./pages/Favoritos.jsx";
import Categorias from "./pages/Categorias.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/cadastro",
      element: <Cadastro />,
    },
    {
      path: "/inicio",
      element: <Inicio />,
    },
    {
      path: "/perfil",
      element: <Perfil />,
    },
    {
      path: "/posts",
      element: <Posts />,
    },
    {
      path: "/favoritos",
      element: <Favoritos />,
    },
    {
      path: "/categorias",
      element: <Categorias />,
    },
  ]);

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
