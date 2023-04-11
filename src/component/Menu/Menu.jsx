import SubMenu from "../SubMenu/SubMenu";

function Menu(props) {
  require("core-js/actual/array/group-by");
  const grupoMenus = props.menus.groupBy((menu) => menu.grupo);
  return (
    <div className="flex-shrink-0 p-3">
      <ul className="list-unstyled ps-0">
        {Object.keys(grupoMenus).map((grupo) => {
          return (
            <>
              <SubMenu grupo={grupo} grupoMenus={grupoMenus} />
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default Menu;
