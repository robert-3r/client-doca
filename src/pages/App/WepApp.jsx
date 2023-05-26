import "./WepApp.scss";
import { useTheme } from "../../hooks";
import { useEffect, useState } from "react";
import { image } from "../../assets";
import { BsListNested } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import {
  MenuHamburger,
  ContentLeft,
  ContentRight,
  Logout,
} from "../../componentes";

const MenuEffect = ({ isActive, menu }) => {
  useEffect(() => {
    const body = document.querySelector("body");

    if (isActive || menu) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [isActive, menu]);

  return null;
};






export const WepApp = () => {
  const { theme } = useTheme();
  const [isActive, setIsActive] = useState(false);
  const [menu, setMenu] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [searchText, setSearchText] = useState("");

  const onOpenCloseMenu = () => {
    setIsActive((prevState) => !prevState);
    setMenu((prevState) => !prevState);

  };

  const backgroundToggle = () => {
    setIsActive(false);
    setMenu(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className={
        isActive && menu ? "container-todo over-flow" : "container-todo"
      }
    >
        <MenuEffect isActive={isActive} menu={menu} />

      <div
        className={
          theme === "light"
            ? "container-todo__n-left  container-todo__left"
            : " container-todo__n-left container-todo__left-dark"
        }
      >
        <img src={image.logoAppFondo} alt="logo app" />
        <div className="container-left__media">
          <ContentLeft
            setCompleted={setCompleted}
            searchText={searchText}
            setSearchText={setSearchText}
            setIsActive={setIsActive}
            setMenu={setMenu}
          />
        </div>

        <div className="container-todo__hamburger">
          {menu ? (
            <AiOutlineClose
              onClick={onOpenCloseMenu}
              className="container-todo__hamburger-close"
            />
          ) : (
            <BsListNested
              onClick={onOpenCloseMenu}
              className="container-todo__hamburger-open"
            />
          )}
        </div>
        <div className="logout">
          <Logout />
        </div>
      </div>

      <div
        onClick={backgroundToggle}
        className={
          theme === "light"
            ? "container-todo__n-right container-todo__right"
            : "container-todo__n-right container-todo__right-dark"
        }
      >
        {/* aqui van a ir componetentes y boton de theme es solo muestra pero no me deja interactuar sobre el */}
        <ContentRight searchText={searchText} completed={completed} />
        {isActive && <div className="back-ground"></div>}

        <div className="container-todo__menu" onClick={stopPropagation}>
          {menu && (
            <MenuHamburger menu={menu}>
              <ContentLeft
                setCompleted={setCompleted}
                searchText={searchText}
                setSearchText={setSearchText}
                setIsActive={setIsActive}
                setMenu={setMenu}
              />
              <div className="container-todo__menu-logout">
                <Logout />
              </div>
            </MenuHamburger>
          )}
        </div>
      </div>
    </div>
  );
};
