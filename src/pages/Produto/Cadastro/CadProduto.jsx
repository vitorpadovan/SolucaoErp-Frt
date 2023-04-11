import { useEffect, useState } from "react";
import categoriaService from "../../../services/categoria.service";
import produtoService from "../../../services/produto.service";
import StatusCard from "../../../component/StatusCard/StatusCard";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CadProduto(props) {
  const [produto, setProduto] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(-1);
  const [errors, setErrors] = useState([]);
  const [sucesso, setSucesso] = useState([]);
  const [idSelecionado, setIdSelecionad] = useState(null);
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    categoriaService.getCategoria().then((e) => setCategorias(e.data));
  }, [props]);
  useEffect(() => {
    if (id !== undefined) {
      setIdSelecionad(id);
      produtoService.getProdutoPorId(id).then((response) => {
        setProduto(response.data.nome);
        setCategoriaSelecionada(response.data.categoria.id);
      });
    } else {
      setIdSelecionad(null);
      setCategoriaSelecionada(-1);
      setProduto("");
    }
  }, [id]);

  const limpaStatus = () => {
    setTimeout(() => {
      setErrors([]);
      setSucesso([]);
    }, 5000);
  };

  function salvarProduto(produto) {
    produtoService
      .salvarProduto(produto)
      .then((e) => {
        setProduto("");
        setCategoriaSelecionada(-1);
        setSucesso([...sucesso, { message: "Sucesso ao cadastrar o item" }]);
        limpaStatus();
      })
      .catch((e) => {
        setErrors(e.response.data.error);
        limpaStatus();
      });
  }

  const atualizarProduto = (produto, id) => {
    produtoService
      .atualizarProduto(produto, id)
      .then((response) => {
        setSucesso([...sucesso, { message: "Sucesso ao atualizar o item" }]);
        setIdSelecionad(null);
        setProduto(null);
        navigate("/listagem-produto", { replace: true });
        limpaStatus();
      })
      .catch((e) => {
        setErrors(e.response.data.error);
        limpaStatus();
      });
  };
  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <h1>Cadastro de Produto</h1>
      <div className="square rounded border p-3 m-auto my-5 w-75 ">
        <form onSubmit={(e) => e.preventDefault()}>
          {id && (
            <Form.Group className="mb-3">
              <Form.Label>Cod.</Form.Label>
              <Form.Control type="text" value={idSelecionado} />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Produto</Form.Label>
            <Form.Control
              type="text"
              value={produto}
              onChange={(e) => setProduto(e.target.value)}
              placeholder="Entre com o nome do produto"
              id="NomeCategoria"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Categoria</Form.Label>
            <Form.Select
              value={categoriaSelecionada}
              onChange={(e) => setCategoriaSelecionada(e.target.value)}
              placeholder="Entre com a categoria"
              id="NomeCategoria"
            >
              <option></option>
              {categorias.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.nome}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Button
            size="lg"
            type="button"
            onClick={() => {
              if (categoriaSelecionada != null) {
                var teste = { Nome: produto, Categoria: categoriaSelecionada };
                console.log(categoriaSelecionada);
                idSelecionado
                  ? atualizarProduto(teste, idSelecionado)
                  : salvarProduto(teste);
              } else {
                setErrors([
                  ...errors,
                  { message: "Categoria não selecionada" },
                ]);
                limpaStatus();
              }
            }}
          >
            Salvar produto
          </Button>
        </form>
      </div>
      {errors.map((x, y) => {
        return <StatusCard key={y} error={x} sucesso={true} />;
      })}
      {sucesso.map((x, y) => {
        return <StatusCard key={y} error={x} sucesso={false} />;
      })}
    </div>
  );
}

export default CadProduto;
