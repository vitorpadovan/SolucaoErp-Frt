import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SubMenu(props) {
  const aberto = {
    acao: "aberto",
    botao: "btn btn-toggle align-items-center rounded",
    embaixo: "collapse show",
    aria: true,
  };
  const fechado = {
    acao: "fehcadoo",
    botao: "btn btn-toggle align-items-center rounded collapsed",
    embaixo: "collapse",
    aria: false,
  };
  const { grupo, grupoMenus } = props;
  const [acao, setAcao] = useState(aberto);

  useEffect(() => {
    setAcao(aberto);
  }, [props]);
  return (
    <li key={grupo} className="mb-3">
      <button
        class={acao.botao}
        data-bs-toggle="collapse"
        data-bs-target={"#" + grupo}
        aria-expanded={acao.aria}
        onClick={() => {
          var resposta = acao.acao == aberto.acao;
          console.log(acao);
          console.log(resposta);
          acao.acao == aberto.acao ? setAcao(fechado) : setAcao(aberto);
        }}
      >
        {grupo}
      </button>
      <div class={acao.embaixo} id={grupo}>
        <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small text-reset">
          {grupoMenus[grupo].map((e, i) => (
            <li key={e.id} className="ms-4 mb-2 text-reset">
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
  );
}

export default SubMenu;
