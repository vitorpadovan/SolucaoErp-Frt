import { useState } from "react";
import categoriaService from "../../../services/categoria.service";
import StatusCard from "../../../component/StatusCard/StatusCard";

function CadCategoria(props) {
  const [categoria, setCategoria] = useState(null);
  const [errors, setErrors] = useState([]);
  const [sucesso, setSucesso] = useState([]);

  const salvarCategoria = (categoria) => {
    categoriaService
      .salvarCategoria({ nome: categoria })
      .then((value) => {
        setCategoria("");
        setSucesso([
          ...sucesso,
          { message: "Sucesso ao cadastrar a categoria" },
        ]);
        limpaStatus();
      })
      .catch((e) => {
        setErrors(e.response.data.error);
        limpaStatus();
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      salvarCategoria(categoria);
    }
  };

  const limpaStatus = () => {
    setTimeout(() => {
      setErrors([]);
      setSucesso([]);
    }, 5000);
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Categoria</label>
        <input
          type="text"
          onChange={(e) => setCategoria(e.target.value)}
          value={categoria}
          onKeyDown={handleKeyDown}
        />
        <button type="button" onClick={() => salvarCategoria(categoria)}>
          Enviar
        </button>
      </form>
      {errors.map((x, y) => {
        return <StatusCard key={y} error={x} />;
      })}
      {sucesso.map((x, y) => {
        return <StatusCard key={y} error={x} />;
      })}
    </>
  );
}

export default CadCategoria;
