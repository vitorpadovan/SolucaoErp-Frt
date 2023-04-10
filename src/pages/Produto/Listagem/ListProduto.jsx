import { useEffect, useState } from "react";
import LstProduto from "../../../component/Produto/LstProduto";
import produtoService from "../../../services/produto.service";

function ListProduto(props) {
  const [produtos, setProdutos] = useState([]);
  useEffect(() => {
    produtoService.getProduto().then((e) => {
      setProdutos(e.data);
    });
  }, [props]);
  return (
    <>
      <h1>Listagem de Produto</h1>
      <LstProduto produtos={produtos} />
    </>
  );
}

export default ListProduto;
