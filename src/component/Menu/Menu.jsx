import { Link } from "react-router-dom";

function Menu(props) {
  require("core-js/actual/array/group-by");
  const grupoMenus = props.menus.groupBy((menu) => menu.grupo);
  return Object.keys(grupoMenus).map((grupo, indice) => {
    return (
      <>
        <h1>{grupo}</h1>
        {grupoMenus[grupo].map((e, i) => (
          <p>
            <Link to={e.link}>{e.nome}</Link>
          </p>
        ))}
      </>
    );
  });
}

export default Menu;
