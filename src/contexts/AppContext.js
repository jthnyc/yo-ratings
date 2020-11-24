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

  // console.log("What is in flip arr at TOP: ", flipArr);
  // console.log("in voted array up top: ", votedArr);

  useEffect(() => {
    localStorage.setItem("votedList", JSON.stringify(votedArr));
  }, [votedArr]);

  useEffect(() => {
    // fetching first time using s parameter for search
    const fetchList = async () => {
      const response = await Axios(listSearchUrl);
      // console.log("LIST SEARCH URL ==== ", listSearchUrl);
      const movies = response.data["Search"] || [];
      const uniqueMovies = filterUniqueMovies(movies);
      setListSearchResult(uniqueMovies);
    };
    fetchList();

    // fetching second time using i parameter for imdb id
    // may need to consider a new conditional criteria...
    if (selectedSearchUrl.includes("i=")) {
      const fetchData = async () => {
        const response = await Axios(selectedSearchUrl);
        const selectedMovie = response.data || {};
        console.log("is this called to set selected? =====", selectedMovie);
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

  /*
  To handle flip, want to do similar as up and down vote -- 
  simply adding on a new property.
  Try using the same method by creating new keyvalue pair first
  */

  const handleFlip = (id) => {
    // first add it to an array with attribute
    // if it exists in array, flip it
    // const movieToFlip = listSearchResult.find((movie) => movie.imdbID === id);
    // const inFlipArr = flippedArr.find((movie) => movie.imdbID === id);
    // // console.log("IS IT IN FLIP ARR: ", inFlipArr);
    // if (inFlipArr) {
    //   // console.log("It's in flip array as object: ", inFlipArr);
    //   inFlipArr.flipped = !inFlipArr.flipped;
    // } else {
    //   setSelectedSearchUrl(API_URL + `&i=${id}`);
    //   setFlippedArr([...flippedArr, { ...movieToFlip, flipped: true }]);
    // }
    setSelectedSearchUrl(API_URL + `&i=${id}`);
    const flippedMovieToAdd = listSearchResult.find(
      (movie) => movie.imdbID === id
    );
    if (flippedMovieToAdd) {
      flippedMovieToAdd.flipped
        ? (flippedMovieToAdd.flipped = !flippedMovieToAdd.flipped)
        : (flippedMovieToAdd.flipped = true);
      const updatedList = [];
      listSearchResult.forEach((movie) =>
        movie.imdbID === flippedMovieToAdd.imdbID
          ? updatedList.push(flippedMovieToAdd)
          : updatedList.push(movie)
      );
      // console.log("updated list: ", updatedList);
      setListSearchResult([...updatedList]);
      // console.log("updated list result: ", listSearchResult);
    }
  };

  const handleUpCount = (id) => {
    const clickedMovie = listSearchResult.find((movie) => movie.imdbID === id);
    let inVotedArr = votedArr.find((movie) => movie.imdbID === id);
    inVotedArr
      ? (votedArr.up += 1)
      : setVotedArr([...votedArr, { ...clickedMovie, up: 1 }]);

    const selectedMovie = listSearchResult.find((movie) => movie.imdbID === id);
    // console.log("selected in handleUpCount: ", selectedMovie);
    if (selectedMovie) {
      selectedMovie.up ? (selectedMovie.up += 1) : (selectedMovie.up = 1);
      const newResult = [];
      listSearchResult.forEach((movie) =>
        movie.imdbID === selectedMovie
          ? newResult.push(selectedMovie)
          : newResult.push(movie)
      );
      setListSearchResult([...newResult]);
      // console.log("after up count: ", listSearchResult);
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

    const selected = listSearchResult.find((movie) => movie.imdbID === id);
    // console.log("selected in handleDownCount: ", selected);
    if (selected) {
      selected.down ? (selected.down += 1) : (selected.down = 1);
      const newResult = [];
      listSearchResult.forEach((movie) =>
        movie.imdbID === selected
          ? newResult.push(selected)
          : newResult.push(movie)
      );
      setListSearchResult([...newResult]);
      // console.log("after down count: ", listSearchResult);
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
