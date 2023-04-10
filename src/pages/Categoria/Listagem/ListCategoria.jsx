import { useEffect, useState } from "react";
import LstCategoriaComp from "../../../component/Categoria/LstCategoria";
import categoriaService from "../../../services/categoria.service";

function ListCategoria(props) {
  const [categorias, setCategorias] = useState([]);

  useEffect(
    (teste) => {
      categoriaService.getCategoria().then((s) => setCategorias(s.data));
    },
    [props]
  );
  return (
    <>
      <h1>Listar categoria</h1>
      <LstCategoriaComp lista={categorias} />
    </>
  );
}

export default ListCategoria;
