import { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const AppContext = createContext();

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `https://omdbapi.com/?apikey=${API_KEY}`;

const AppContextProvider = (props) => {
  const [searchResult, setSearchResult] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState(API_URL);
  const [selected, setSelected] = useState({});
  const [votedArr, setVotedArr] = useState([]);

  // fetching first time using s parameter for search
  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios(url);
      const movies = response.data["Search"] || [];
      const uniqueMovies = filterUniqueMovies(movies);
      setSearchResult(uniqueMovies);
    };
    fetchData();
  }, [url]);

  // fetching second time using i parameter for imdb id
  useEffect(() => {
    const fetchData = async () => {
      const response = await Axios(url);
      const selectedMovie = response.data || {};
      // console.log("SELECTED movie: ", selectedMovie);
      setSelected(selectedMovie);
    };
    fetchData();
  }, [url]);

  // search result can sometimes return duplicates, sorting by year as well
  const filterUniqueMovies = (movieArr) => {
    let uniqueMovieIDs = new Set(movieArr.map((movie) => movie.imdbID));
    let uniqueMovies = [];
    uniqueMovieIDs.forEach((id) =>
      uniqueMovies.push(movieArr.find((movie) => movie.imdbID === id))
    );
    uniqueMovies.sort((a, b) => a.Year - b.Year);
    return uniqueMovies;
  };

  // using the movie selected to create a new search URL
  // have to use a second useEffect because otherwise url is not updated
  const openDetail = async (id) => {
    setUrl(API_URL + `&i=${id}`);
  };

  const handleUpCount = (id) => {
    const clickedMovie = searchResult.find((movie) => movie.imdbID === id);

    let inVotedArr = votedArr.find((movie) => movie.imdbID === id);
    inVotedArr
      ? (votedArr.up += 1)
      : setVotedArr([...votedArr, { ...clickedMovie, up: 1 }]);
    // if (inVotedArr) {
    //   votedArr.up += 1;
    // } else {
    //   let newData = { ...clickedMovie, up: 1 };
    //   setVotedArr([...votedArr, { ...newData }]);
    // }

    const selectedMovie = searchResult.find((movie) => movie.imdbID === id);
    if (selectedMovie) {
      selectedMovie.up ? (selectedMovie.up += 1) : (selectedMovie.up = 1);
      const newResult = [];
      searchResult.forEach((movie) =>
        movie.imdbID === selectedMovie
          ? newResult.push(selectedMovie)
          : newResult.push(movie)
      );
      setSearchResult([...newResult]);
    }
  };

  const handleDownCount = (id) => {
    const clickedMovie = searchResult.find((movie) => movie.imdbID === id);
    const inVotedArr = votedArr.find((movie) => movie.imdbID === id);
    inVotedArr
      ? votedArr.down
        ? (inVotedArr.down += 1)
        : (inVotedArr.down = 1)
      : setVotedArr([...votedArr, { ...clickedMovie, down: 1 }]);
    // if (inVotedArr) {
    //   inVotedArr.down ? (inVotedArr.down += 1) : (inVotedArr.down = 1);
    // } else {
    //   let newData = { ...clickedMovie, down: 1 };
    //   setVotedArr([...votedArr, { ...newData }]);
    // }

    const selected = searchResult.find((movie) => movie.imdbID === id);
    if (selected) {
      selected.down ? (selected.down += 1) : (selected.down = 1);
      const newResult = [];
      searchResult.forEach((movie) =>
        movie.imdbID === selected
          ? newResult.push(selected)
          : newResult.push(movie)
      );
      setSearchResult([...newResult]);
    }
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
        votedArr,
        onOpenDetail: openDetail,
        handleUpCount: handleUpCount,
        handleDownCount: handleDownCount,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
