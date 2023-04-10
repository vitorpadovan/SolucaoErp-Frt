import { useEffect, useState } from "react";
import produtoService from "../../services/produto.service";

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
      <h2>{produtos.length} produtos encontrados</h2>
      <table>
        <thead>
          <tr>
            <th>Cód.</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>{produto.descricao}</td>
              <td>
                <button
                  onClick={() => {
                    produtoService
                      .deleteProduto(produto.id)
                      .then(() => {
                        const index = produtos.indexOf(produto);
                        if (index > -1) {
                          produtos.splice(index, 1);
                          setProdutos(produtos);
                        }
                        setSucesso([...sucesso, { message: "Item deletado" }]);
                        limpaStatus();
                      })
                      .catch((e) => {});
                  }}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default LstProduto;
