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
  const [flippedArr, setFlippedArr] = useState([]);
  const [newMovieList, setNewMovieList] = useState([]);
  const [votedArr, setVotedArr] = useState(() => {
    const localData = localStorage.getItem("votedList");
    return localData ? JSON.parse(localData) : [];
  });

  // console.log("AFTER FLIPPING: ", newMovieList);
  // if there is stuff in newMovieList, render that list, otherwise render original search result

  useEffect(() => {
    localStorage.setItem("votedList", JSON.stringify(votedArr));
  }, [votedArr]);

  useEffect(() => {
    // fetching first time using s parameter for search
    const fetchList = async () => {
      const response = await Axios(listSearchUrl);
      const movies = response.data["Search"] || [];
      const uniqueMovies = filterUniqueMovies(movies);
      setListSearchResult(uniqueMovies);
    };
    fetchList();

    // fetching second time using i parameter for imdb id
    if (isFlipped === true) {
      const fetchData = async () => {
        const response = await Axios(selectedSearchUrl);
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
  // flip the boolean value of movie matching id
  const handleFlip = (id) => {
    setIsFlipped(!isFlipped);
    setSelectedSearchUrl(API_URL + `&i=${id}`);
    let flippedMovie = listSearchResult.find((movie) => movie.imdbID === id);
    setFlippedArr([...flippedArr, flippedMovie]);
    flippedMovie.flipped = !isFlipped;
    console.log("Current movie to be flipped === ", flippedMovie.flipped);
    const newList = [];
    listSearchResult.forEach((movie) => {
      movie.imdbID === flippedMovie.imdbID
        ? newList.push(flippedMovie)
        : newList.push(movie);
    });
    // console.log("NEW LIST: ", newList);
    setNewMovieList([...newList]);
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
      console.log("after up count: ", listSearchResult);
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
        selectedSearchUrl,
        setSelectedSearchUrl,
        votedArr,
        isFlipped,
        setIsFlipped,
        newMovieList,
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
