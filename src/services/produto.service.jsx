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

produtoService.getProdutoPorId = (id) => {
  return Axios.get(
    "http://" + process.env.REACT_APP_API_LINK + "/Produto/" + id
  );
};

produtoService.deleteProduto = (id) => {
  return Axios.delete(
    "http://" + process.env.REACT_APP_API_LINK + "/Produto/" + id
  );
};

produtoService.atualizarProduto = (produto, id) => {
  return Axios.put(
    "http://" + process.env.REACT_APP_API_LINK + "/Produto/" + id,
    produto
  );
};
export default produtoService;
