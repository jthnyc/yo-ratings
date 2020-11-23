import { createContext, useState, useEffect } from "react";
import Axios from "axios";

export const AppContext = createContext();

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `https://omdbapi.com/?apikey=${API_KEY}`;

const AppContextProvider = (props) => {
  const [listSearchResult, setListSearchResult] = useState([]);
  const [title, setTitle] = useState("");
  const [listSearchUrl, setListSearchUrl] = useState(API_URL);
  const [selectedSearchUrl, setSelectedSearchUrl] = useState(API_URL);
  const [selected, setSelected] = useState({});
  const [isFlipped, setIsFlipped] = useState(false);
  const [votedArr, setVotedArr] = useState(() => {
    const localData = localStorage.getItem("votedList");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("votedList", JSON.stringify(votedArr));
  }, [votedArr]);

  useEffect(() => {
    // fetching first time using s parameter for search
    const fetchList = async () => {
      const response = await Axios(listSearchUrl);
      // console.log("LIST search URL = ", listSearchUrl);
      const movies = response.data["Search"] || [];
      const uniqueMovies = filterUniqueMovies(movies);
      setListSearchResult(uniqueMovies);
    };
    fetchList();

    // fetching second time using i parameter for imdb id
    console.log("isFlipped is now: ", isFlipped);
    if (isFlipped !== false) {
      const fetchData = async () => {
        const response = await Axios(selectedSearchUrl);
        // console.log("SELECTED search URL ===== ", selectedSearchUrl);
        const selectedMovie = response.data || {};
        setSelected(selectedMovie);
      };
      fetchData();
    }
  }, [isFlipped, listSearchUrl, selectedSearchUrl]);

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
  const handleFlip = (id) => {
    setSelectedSearchUrl(API_URL + `&i=${id}`);
    // setIsFlipped(
    //   isFlipped === false ? !isFlipped : (!isFlipped, setSelected({}))
    // );
    setIsFlipped(!isFlipped);
    // setIsFlipped(selected);
  };

  const handleUpCount = (id) => {
    const clickedMovie = listSearchResult.find((movie) => movie.imdbID === id);
    let inVotedArr = votedArr.find((movie) => movie.imdbID === id);
    inVotedArr
      ? (votedArr.up += 1)
      : setVotedArr([...votedArr, { ...clickedMovie, up: 1 }]);

    const selectedMovie = listSearchResult.find((movie) => movie.imdbID === id);
    if (selectedMovie) {
      selectedMovie.up ? (selectedMovie.up += 1) : (selectedMovie.up = 1);
      const newResult = [];
      listSearchResult.forEach((movie) =>
        movie.imdbID === selectedMovie
          ? newResult.push(selectedMovie)
          : newResult.push(movie)
      );
      setListSearchResult([...newResult]);
    }
  };

  const handleDownCount = (id) => {
    const clickedMovie = listSearchResult.find((movie) => movie.imdbID === id);
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

    const selected = listSearchResult.find((movie) => movie.imdbID === id);
    if (selected) {
      selected.down ? (selected.down += 1) : (selected.down = 1);
      const newResult = [];
      listSearchResult.forEach((movie) =>
        movie.imdbID === selected
          ? newResult.push(selected)
          : newResult.push(movie)
      );
      setListSearchResult([...newResult]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        listSearchResult,
        setListSearchResult,
        title,
        setTitle,
        listSearchUrl,
        setListSearchUrl,
        API_URL,
        selected,
        setSelected,
        votedArr,
        isFlipped,
        setIsFlipped,
        handleFlip: handleFlip,
        handleUpCount: handleUpCount,
        handleDownCount: handleDownCount,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
