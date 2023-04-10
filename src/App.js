import "./App.css";
import Menu from "./component/Menu/Menu";
import CadCategoria from "./pages/Categoria/Cadastro/CadCategoria";
import ListCategoria from "./pages/Categoria/Listagem/ListCategoria";
import CadProduto from "./pages/Produto/Cadastro/CadProduto";
import ListProduto from "./pages/Produto/Listagem/ListProduto";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const menus = [
    {
      cod: 1,
      grupo: "Categoria",
      nome: "Cadastro",
      widget: <CadCategoria />,
      link: "cadastro-categoria",
    },
    {
      cod: 1,
      grupo: "Categoria",
      nome: "Listar",
      widget: <ListCategoria />,
      link: "listagem-categoria",
    },
    {
      cod: 1,
      grupo: "Produto",
      nome: "Cadastro",
      widget: <CadProduto />,
      link: "cadastro-produto",
    },
    {
      cod: 1,
      grupo: "Produto",
      nome: "Listar",
      widget: <ListProduto />,
      link: "listagem-produto",
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
            {menus.map((e, i) => (
              <Route
                key={i}
                path={e.link}
                exact
                element={
                  <>
                    {/* TODO Colocar bread */}
                    {/* <>Teste</> */}
                    {e.widget}
                  </>
                }
              />
            ))}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
