import { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const AppContext = createContext();

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `https://omdbapi.com/?apikey=${API_KEY}`;

const AppContextProvider = (props) => {
  const [searchResult, setSearchResult] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState(API_URL);

  // fetching movie data from omdb api
  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios(url);
      //   console.log("URL: ", url);
      //   console.log("RESPONSE == ", response);
      const movies = response.data["Search"] || [];
      const uniqueMovies = filterUniqueMovies(movies);
      console.log("unique movies == ", uniqueMovies);
      setSearchResult(uniqueMovies);
    };
    fetchData();
  }, [url]);

  const filterUniqueMovies = (movieArr) => {
    let uniqueMovieIDs = new Set(movieArr.map((movie) => movie.imdbID));
    let uniqueMovies = [];
    uniqueMovieIDs.forEach((id) =>
      uniqueMovies.push(movieArr.find((movie) => movie.imdbID === id))
    );
    return uniqueMovies;
  };

  return (
    <AppContext.Provider
      value={{
        searchResult,
        setSearchResult,
        title,
        setTitle,
        url,
        setUrl,
        API_URL,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
