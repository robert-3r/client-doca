/* eslint-disable react/prop-types */
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { MdOutlinePendingActions } from "react-icons/md";
import "./TodoIsCompleted.scss";
import { NavLink } from "react-router-dom";

export const TodoIsCompleted = ({ setCompleted, setIsActive, setMenu }) => {
  const handleFalse = () => {
    if (setIsActive && setMenu) {
      setIsActive(false);
      setMenu(false);
    } else {
      return;
    }

    setCompleted(false);
  };
  const handleTrue = () => {
    setIsActive(false);
    setMenu(false);
    setCompleted(true);
  };

  return (
    <div className="todo-is-completed">
      <button className="todo-is-completed__true" onClick={handleTrue}>
        <BsFillBookmarkStarFill />
        <NavLink
           
          >
           Tareas terminadas
          </NavLink>
      </button>
      <button className="todo-is-completed__false" onClick={handleFalse}>
        <MdOutlinePendingActions />
        <NavLink
          
          
          >
           Tareas pendientes
          </NavLink>
      </button>
    </div>
  );
};
