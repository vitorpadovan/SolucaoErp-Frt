import { useEffect, useState } from "react";
import categoriaService from "../../services/categoria.service";
import StatusCard from "../StatusCard/StatusCard";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function LstCategoriaComp(props) {
  const [categorias, setCategorias] = useState([]);
  const [errors, setErrors] = useState([]);
  const [sucesso, setSucesso] = useState([]);

  const limpaStatus = () => {
    setTimeout(() => {
      setErrors([]);
      setSucesso([]);
    }, 5000);
  };

  useEffect(() => {
    setCategorias(props.lista);
  }, [props]);
  return (
    <>
      <div className="d-flex justify-content-center flex-column align-items-center">
        <h2>{categorias.length} categorias encontrados</h2>
        <table className="table table-sm table-hover table-striped table-bordered table-condensed table-responsive w-75">
          <thead>
            <tr>
              <th width="3%" className="text-center">
                Cod
              </th>
              <th width="3%" className="text-center">
                Descricao
              </th>
              <th width="3%" className="text-center">
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td className="text-center">{categoria.id}</td>
                <td className="text-center">{categoria.nome}</td>
                <td className="text-center">
                  <Button
                    size="sm"
                    className="mx-2 my-1"
                    onClick={() => {
                      categoriaService
                        .deletarCategoria(categoria.id)
                        .then(() => {
                          const index = categorias.indexOf(categoria);
                          if (index > -1) {
                            categorias.splice(index, 1);
                            setCategorias(categorias);
                          }
                          setSucesso([
                            ...sucesso,
                            { message: "Item deletado" },
                          ]);
                          limpaStatus();
                        })
                        .catch((e) => {
                          setErrors(e.response.data.error);
                          limpaStatus();
                        });
                    }}
                  >
                    Deletar
                  </Button>
                  <Link to={"../cadastro-categoria/" + categoria.id}>
                    <Button size="sm" className="mx-2 my-1">
                      Editar
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {errors.map((x, y) => {
        return <StatusCard key={y} error={x} sucesso={true} />;
      })}
      {sucesso.map((x, y) => {
        return <StatusCard key={y} error={x} sucesso={false} />;
      })}
    </>
  );
}

export default LstCategoriaComp;
