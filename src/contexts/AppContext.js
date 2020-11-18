import { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const AppContext = createContext();

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `https://omdbapi.com/?apikey=${API_KEY}`;

const AppContextProvider = (props) => {
  const [searchResult, setSearchResult] = useState([]);
  const [title, setTitle] = useState("");
  const [selected, setSelected] = useState({});
  const [url, setUrl] = useState(API_URL);

  console.log("SELECTED ===== ", selected);
  // fetching movie data from omdb api
  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios(url);
      //   console.log("URL: ", url);
      //   console.log("RESPONSE == ", response);
      const movies = response.data["Search"] || [];
      const uniqueMovies = filterUniqueMovies(movies);
      //   console.log("unique movies == ", uniqueMovies);
      setSearchResult(uniqueMovies);
    };
    fetchData();
  }, [url]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios(url);
      const selectedMovie = response.data;
      //   console.log("URL IN SECOND FETCH: ", url);
      //   console.log("DATA IN SECOND FETCH: ", response.data);
      //   console.log("SELECTED MOVIE: ", selectedMovie);
      setSelected(selectedMovie);
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

  const openDetail = (id) => {
    // console.log("ID AS PARAMETER", id);
    // setIMDB(id)
    setUrl(API_URL + `&i=${id}`);
    // const selectedMovie = searchResult.find((movie) => movie.imdbID === id);
    // console.log("SELECTED MOVIE: ", selectedMovie);
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
        selected,
        onOpenDetail: openDetail,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
