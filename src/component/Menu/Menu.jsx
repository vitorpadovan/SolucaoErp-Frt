import { Link } from "react-router-dom";

function Menu(props) {
  require("core-js/actual/array/group-by");
  const grupoMenus = props.menus.groupBy((menu) => menu.grupo);
  return (
    <div className="flex-shrink-0 p-3">
      <ul className="list-unstyled ps-0">
        {Object.keys(grupoMenus).map((grupo, indice) => {
          return (
            <>
              <li key={grupo} className="mb-3">
                <button
                  class="btn btn-toggle align-items-center rounded w-100"
                  data-bs-toggle="collapse"
                  data-bs-target={"#" + grupo}
                  aria-expanded="true"
                >
                  {grupo}
                </button>
                <div class="collapse show" id={grupo}>
                  <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small text-reset">
                    {grupoMenus[grupo].map((e, i) => (
                      <li key={e.id} className="ms-4 text-reset">
                        {e.exibeMenu && (
                          <Link
                            to={e.link}
                            class="link-dark rounded text-decoration-none"
                          >
                            {e.nome}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default Menu;
