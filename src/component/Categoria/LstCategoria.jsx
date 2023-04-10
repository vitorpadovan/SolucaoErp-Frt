import { useEffect, useState } from "react";
import categoriaService from "../../services/categoria.service";
import StatusCard from "../StatusCard/StatusCard";

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
      <h2>{categorias.length} categorias encontrados</h2>
      <table>
        <thead>
          <tr>
            <th>Cod</th>
            <th>Descricao</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.nome}</td>
              <td>
                <button
                  onClick={() => {
                    categoriaService
                      .deletarCategoria(categoria.id)
                      .then(() => {
                        const index = categorias.indexOf(categoria);
                        if (index > -1) {
                          categorias.splice(index, 1);
                          setCategorias(categorias);
                        }
                        setSucesso([...sucesso, { message: "Item deletado" }]);
                        limpaStatus();
                      })
                      .catch((e) => {
                        setErrors(e.response.data.error);
                        limpaStatus();
                      });
                  }}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {errors.map((x, y) => {
        return <StatusCard key={y} error={x} />;
      })}
      {sucesso.map((x, y) => {
        return <StatusCard key={y} error={x} />;
      })}
    </>
  );
}

export default LstCategoriaComp;
