/* eslint-disable react/prop-types */
import "./ContentLeft.scss";
import { Profile } from "../Profile";
import { SearchTodo } from "../SearchTodo";

import { TodoIsCompleted } from "../TodoIsCompleted";

export const ContentLeft = ({
  searchText,
  setSearchText,
  setCompleted,
  setIsActive,
  setMenu,
}) => {
  return (
    <>
      <div className="content-left">
        <Profile />
        <SearchTodo searchText={searchText} setSearchText={setSearchText} />
        <TodoIsCompleted
          setCompleted={setCompleted}
          setIsActive={setIsActive}
          setMenu={setMenu}
        />
      </div>
    </>
  );
};
