import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./component/Menu/Menu";
import CadCategoria from "./pages/Categoria/Cadastro/CadCategoria";
import ListCategoria from "./pages/Categoria/Listagem/ListCategoria";
import CadProduto from "./pages/Produto/Cadastro/CadProduto";
import ListProduto from "./pages/Produto/Listagem/ListProduto";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const menus = [
    {
      id: 1,
      grupo: "Categoria",
      nome: "Cadastro",
      widget: <CadCategoria />,
      link: "cadastro-categoria/:id",
      exibeMenu: false,
    },
    {
      id: 2,
      grupo: "Categoria",
      nome: "Cadastro",
      widget: <CadCategoria />,
      link: "cadastro-categoria",
      exibeMenu: true,
    },
    {
      id: 3,
      grupo: "Categoria",
      nome: "Listar",
      widget: <ListCategoria />,
      link: "listagem-categoria",
      exibeMenu: true,
    },
    {
      id: 4,
      grupo: "Produto",
      nome: "Cadastro",
      widget: <CadProduto />,
      link: "cadastro-produto",
      exibeMenu: true,
    },
    {
      id: 5,
      grupo: "Produto",
      nome: "Cadastro",
      widget: <CadProduto />,
      link: "cadastro-produto/:id",
      exibeMenu: false,
    },
    {
      id: 6,
      grupo: "Produto",
      nome: "Listar",
      widget: <ListProduto />,
      link: "listagem-produto",
      exibeMenu: true,
    },
  ];
  return (
    <div className="fullBody">
      <Router>
        <div className="menu">
          <Menu menus={menus} />
        </div>
        <div className="content">
          <Routes>
            {menus.map((e) => {
              return (
                <Route
                  key={e.id}
                  path={e.link}
                  exact
                  element={<>{e.widget}</>}
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
