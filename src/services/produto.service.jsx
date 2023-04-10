import Axios from "axios";

const produtoService = {};

produtoService.salvarProduto = (produto) => {
  return Axios.post(
    "http://" + process.env.REACT_APP_API_LINK + "/Produto",
    produto
  );
};

produtoService.getProduto = () => {
  return Axios.get("http://" + process.env.REACT_APP_API_LINK + "/Produto");
};

produtoService.deleteProduto = (id) => {
  return Axios.delete(
    "http://" + process.env.REACT_APP_API_LINK + "/Produto/" + id
  );
};
export default produtoService;
