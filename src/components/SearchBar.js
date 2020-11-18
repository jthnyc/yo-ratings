import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const SearchBar = () => {
  const { title, setTitle, setUrl, API_URL } = useContext(AppContext);

  return (
    <div>
      <form
        onSubmit={(e) => {
          setUrl(API_URL + `&s=${title}&type=movie`);
          e.preventDefault();
        }}
      >
        <button type="submit">
          <div>
            <label htmlFor="inputTitle">Movie Title</label>
            <input
              type="search"
              value={title}
              placeholder="Search Movies"
              onFocus={(e) => (e.target.placeholder = "")}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
