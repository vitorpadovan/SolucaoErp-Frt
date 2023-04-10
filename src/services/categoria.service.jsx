import Axios from "axios";

const categoriaService = {};

categoriaService.salvarCategoria = (categoria) => {
  return Axios.post(
    "http://" + process.env.REACT_APP_API_LINK + "/categoria",
    categoria
  );
};

categoriaService.getCategoria = () => {
  return Axios.get("http://" + process.env.REACT_APP_API_LINK + "/Categoria");
};

categoriaService.getCategoriaPorId = (id) => {
  return Axios.get(
    "http://" + process.env.REACT_APP_API_LINK + "/Categoria/" + id
  );
};

categoriaService.deletarCategoria = (id) => {
  return Axios.delete(
    "http://" + process.env.REACT_APP_API_LINK + "/Categoria/" + id
  );
};

categoriaService.atualizarCategoria = (categoria, id) => {
  return Axios.put(
    "http://" + process.env.REACT_APP_API_LINK + "/Categoria/" + id,
    categoria
  );
};
export default categoriaService;
