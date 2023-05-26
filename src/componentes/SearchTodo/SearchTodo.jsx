import "./SearchTodo.scss";
import { BsSearchHeart } from "react-icons/bs";

export const SearchTodo = ({ searchText, setSearchText }) => {
 
  return (
    <>
      <div className="search-todo">
        <input
          type="text"
          placeholder="Buscar tarea..."
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />

        <button className="search-todo__icon" type="submit">
          <BsSearchHeart />
        </button>
      </div>
    </>
  );
};
