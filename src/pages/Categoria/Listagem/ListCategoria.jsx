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
    <div className="text-center">
      <h1>Listagem de Categoria</h1>
      <LstCategoriaComp lista={categorias} />
    </div>
  );
}

export default ListCategoria;
