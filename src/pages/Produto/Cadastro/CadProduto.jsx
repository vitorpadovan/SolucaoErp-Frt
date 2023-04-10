import { useEffect, useState } from "react";
import categoriaService from "../../../services/categoria.service";
import produtoService from "../../../services/produto.service";
import StatusCard from "../../../component/StatusCard/StatusCard";

function CadProduto(props) {
  const [produto, setProduto] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(-1);
  const [errors, setErrors] = useState([]);
  const [sucesso, setSucesso] = useState([]);

  useEffect(() => {
    categoriaService.getCategoria().then((e) => setCategorias(e.data));
  }, [props]);

  const limpaStatus = () => {
    setTimeout(() => {
      setErrors([]);
      setSucesso([]);
    }, 5000);
  };
  return (
    <>
      <h1>Cadastro de Produto</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Produto</label>
        <input
          type="text"
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
        />
        <br />
        <label>Categoria</label>
        <select
          onChange={(e) => setCategoriaSelecionada(e.target.value)}
          value={categoriaSelecionada}
        >
          <option></option>
          {categorias.map((x, y) => (
            <option key={x.id} value={x.id}>
              {x.nome}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => {
            if (categoriaSelecionada != null) {
              var teste = { Nome: produto, Categoria: categoriaSelecionada };
              produtoService
                .salvarProduto(teste)
                .then((e) => {
                  setProduto("");
                  setCategoriaSelecionada(-1);
                  setSucesso([
                    ...sucesso,
                    { message: "Sucesso ao cadastrar o item" },
                  ]);
                  limpaStatus();
                })
                .catch((e) => {
                  setErrors(e.response.data.error);
                  limpaStatus();
                });
            } else {
              setErrors([...errors, { message: "Categoria não selecionada" }]);
              limpaStatus();
            }
          }}
        >
          Enviar
        </button>
      </form>
      {errors.map((x, y) => {
        return <StatusCard key={y} error={x} />;
      })}
      {sucesso.map((x, y) => {
        return <StatusCard key={y} error={x} />;
      })}
    </>
  );
}

export default CadProduto;
