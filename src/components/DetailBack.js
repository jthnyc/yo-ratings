import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const DetailBack = () => {
  const { selected } = useContext(AppContext);
  return (
    <div>
      <h3>{selected.Title}</h3>
      <h3>Director: {selected.Director}</h3>
      <p>{selected.Plot}</p>
    </div>
  );
};

export default DetailBack;
