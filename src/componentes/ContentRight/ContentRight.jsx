import "./ContentRight.scss";
import { ListTodo } from "./ListTodo";

import { useTheme } from "../../hooks";
import { CreateTodo } from "./CreateTodo";
import { useState } from "react";

export const ContentRight = ({ searchText,completed }) => {
  const { theme } = useTheme();
  const [onReload, setonReload] = useState(false);

  const handleReload = () => {
    setonReload((prevState) => !prevState);
  };

  return (
    <>
      <div className="content-right">
        <h1>
          Hola ,<span>es momento de ordenar tu día</span>{" "}
        </h1>
          

        <ListTodo
          searchText={searchText}
          onReload={onReload}
          handleReload={handleReload}
          completed={completed}
        />

        <div className="content-right__create-todo">
          <CreateTodo theme={theme} handleReload={handleReload} />
        </div>
      </div>
      {/* 
      <button className="button-theme " onClick={toggleTheme}>
        {theme === "light" ? (
          <BsFillMoonStarsFill className="button-theme-moon" />
        ) : (
          <BsFillSunFill className="button-theme-soon" />
        )}
      </button> */}
    </>
  );
};
