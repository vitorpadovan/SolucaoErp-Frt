import { useEffect, useState } from "react";
import categoriaService from "../../../services/categoria.service";
import StatusCard from "../../../component/StatusCard/StatusCard";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";

function CadCategoria(props) {
  const [categoria, setCategoria] = useState(null);
  const [errors, setErrors] = useState([]);
  const [sucesso, setSucesso] = useState([]);
  const [idSelecionado, setIdSelecionado] = useState(null);
  let { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      categoriaService.getCategoriaPorId(id).then((response) => {
        setIdSelecionado(id);
        setCategoria(response.data.nome);
      });
    } else {
      setIdSelecionado(null);
      setCategoria("");
    }
  }, [id]);
  const atualizarCategoria = (categoria, id) => {
    categoriaService
      .atualizarCategoria({ nome: categoria, id: id }, id)
      .then((response) => {
        setIdSelecionado(null);
        setCategoria("");
        setSucesso([
          ...sucesso,
          { message: "Sucesso ao atualizar a categoria" },
        ]);
      })
      .catch((response) => {});
  };
  const salvarCategoria = (categoria) => {
    categoriaService
      .salvarCategoria({ nome: categoria })
      .then((value) => {
        setCategoria("");
        setSucesso([
          ...sucesso,
          { message: "Sucesso ao cadastrar a categoria" },
        ]);
        limpaStatus();
      })
      .catch((e) => {
        setErrors(e.response.data.error);
        limpaStatus();
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      salvarCategoria(categoria);
    }
  };

  const limpaStatus = () => {
    setTimeout(() => {
      setErrors([]);
      setSucesso([]);
    }, 5000);
  };

  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <h1>Cadastro de Categoria</h1>
      <div className="square rounded border p-3 m-auto my-5 w-75 ">
        <form onSubmit={(e) => e.preventDefault()}>
          {idSelecionado && (
            <Form.Group className="mb-3">
              <Form.Label>Cod. Categoria</Form.Label>
              <Form.Control type="text" value={idSelecionado} />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Categoria</Form.Label>
            <Form.Control
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              placeholder="Entre com a categoria"
              id="NomeCategoria"
              onKeyDown={handleKeyDown}
            />
          </Form.Group>
          <Button
            size="lg"
            onClick={() => {
              idSelecionado
                ? atualizarCategoria(categoria, id)
                : salvarCategoria(categoria);
            }}
          >
            Salvar categoria
          </Button>
        </form>
        {errors.map((x, y) => {
          return <StatusCard key={y} error={x} sucesso={true} />;
        })}
        {sucesso.map((x, y) => {
          return <StatusCard key={y} error={x} sucesso={false} />;
        })}
      </div>
    </div>
  );
}

export default CadCategoria;
