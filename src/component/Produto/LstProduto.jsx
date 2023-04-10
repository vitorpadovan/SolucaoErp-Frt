import { useEffect, useState } from "react";
import produtoService from "../../services/produto.service";
import { Button } from "react-bootstrap";
import StatusCard from "../StatusCard/StatusCard";
import { Link } from "react-router-dom";

function LstProduto(props) {
  const [produtos, setProdutos] = useState([]);
  const [errors, setErrors] = useState([]);
  const [sucesso, setSucesso] = useState([]);

  const limpaStatus = () => {
    setTimeout(() => {
      setErrors([]);
      setSucesso([]);
    }, 5000);
  };
  useEffect(() => {
    setProdutos(props.produtos);
  }, [props]);
  return (
    <>
      <div className="d-flex justify-content-center flex-column align-items-center">
        <h2>{produtos.length} produtos encontrados</h2>
        <table className="table table-sm table-hover table-striped table-bordered table-condensed table-responsive w-75">
          <thead>
            <tr>
              <th width="3%" className="text-center">
                Cód.
              </th>
              <th width="3%" className="text-center">
                Nome
              </th>
              <th width="3%" className="text-center">
                Ação
              </th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td className="text-center">{produto.id}</td>
                <td className="text-center">{produto.nome}</td>
                <td className="text-center">
                  <Button
                    size="sm"
                    className="mx-2 my-1"
                    onClick={() => {
                      produtoService
                        .deleteProduto(produto.id)
                        .then(() => {
                          const index = produtos.indexOf(produto);
                          if (index > -1) {
                            produtos.splice(index, 1);
                            setProdutos(produtos);
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
                  <Link to={"../cadastro-produto/" + produto.id}>
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

export default LstProduto;
