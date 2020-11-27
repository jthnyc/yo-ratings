import { createContext, useState, useEffect } from "react";
import Axios from "axios";
import useStickyState from "@nicer-toolbox/use-sticky-state";

export const AppContext = createContext();

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = `https://omdbapi.com/?apikey=${API_KEY}`;

const AppContextProvider = (props) => {
  const [listSearchResult, setListSearchResult] = useState([]);
  const [title, setTitle] = useStickyState("", "query");
  const [listSearchUrl, setListSearchUrl] = useState(API_URL);
  const [selectedSearchUrl, setSelectedSearchUrl] = useState(API_URL);
  const [selected, setSelected] = useState([]);
  const [disabled, setDisabled] = useState({});
  const [votedArr, setVotedArr] = useStickyState([], "votedList");
  const [searchTermArr, setSearchTermArr] = useStickyState([], "searchTerms");

  // fetching first time using s parameter for movie list search
  useEffect(() => {
    const savedMovieList = JSON.parse(localStorage.getItem("MovieList"));
    console.log("saved movies: ", savedMovieList);
    const matched = isInSearchTermArr(title, searchTermArr);
    if (matched) {
      setListSearchResult(savedMovieList);
    } else {
      const fetchList = async () => {
        const response = await Axios(listSearchUrl);
        const movies = response.data["Search"] || [];
        const uniqueMovies = filterUniqueMovies(movies);
        setListSearchResult(uniqueMovies);
        setSearchTermArr([...searchTermArr, title]);
      };
      fetchList();
    }
  }, [listSearchUrl]);

  // fetching only when list search result has updated?
  useEffect(() => {
    localStorage.setItem("MovieList", JSON.stringify(listSearchResult));
  }, [listSearchResult]);

  // fetching second time using i parameter for movie imdbID search
  useEffect(() => {
    if (selectedSearchUrl.includes("i=")) {
      const fetchData = async () => {
        const response = await Axios(selectedSearchUrl);
        const selectedMovie = response.data || {};
        setSelected([...selected, selectedMovie]);
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSearchUrl]);

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

  const isInSearchTermArr = (term, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === term) {
        console.log("term searched before!");
        return true;
      }
    }
    return false;
  };

  // const checkVotedArr = (voteArr, movieList) => {
  //   let toCheckObj = votedArr.length !== 0 ? voteArr[0] : {};
  //   // check if votedarr is not empty, and if listSearchResult contains that object
  //   for (let movie of movieList) {
  //     if (movie === toCheckObj) {
  //       console.log("match === ", movie);
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  const handleFlip = (id) => {
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
      setListSearchResult([...updatedList]);
    }
  };

  const handleUpCount = (id) => {
    const selectedMovie = listSearchResult.find((movie) => movie.imdbID === id);
    // console.log("UP selected === ", selectedMovie);
    let obj = {};
    if (selectedMovie.up) {
    } else {
      if (selectedMovie) {
        // eslint-disable-next-line no-unused-expressions
        selectedMovie.up
          ? ((selectedMovie.up += 1),
            (obj[id] = { up: true, down: false }),
            setDisabled({ ...disabled, obj }))
          : ((selectedMovie.up = 1),
            (obj[id] = { up: false, down: true }),
            setDisabled({ ...disabled, obj }));
        const newResult = [];
        listSearchResult.forEach((movie) =>
          movie.imdbID === selectedMovie
            ? newResult.push(selectedMovie)
            : newResult.push(movie)
        );
        setListSearchResult([...newResult]);
        setVotedArr([...newResult]);
      }
    }
  };

  const handleDownCount = (id) => {
    const selected = listSearchResult.find((movie) => movie.imdbID === id);
    // console.log("DOWN selected ===  ", selected);
    if (selected) {
      selected.down ? (selected.down += 1) : (selected.down = 1);
      const newResult = [];
      listSearchResult.forEach((movie) =>
        movie.imdbID === selected
          ? newResult.push(selected)
          : newResult.push(movie)
      );
      setListSearchResult([...newResult]);
      // if there are currently stuff and the id does not match any existing, add to it
      // otherwise just copy newResult
      let hasExistingResults = checkExistingResults(id, votedArr);
      if (hasExistingResults) {
        // if there are currently stuff, only add things that do not match ones that are in votedArr
        let finalResult = [];
        finalResult = createNewList(votedArr, listSearchResult);
        setVotedArr([...finalResult]);
      } else {
        setVotedArr([...newResult]);
      }
    }
  };

  const checkExistingResults = (id, votedList) => {
    for (let i = 0; i < votedList; i++) {
      let currID = votedList[i].imdbID;
      if (currID === id) {
        return true;
      }
    }
    return false;
  };

  const createNewList = (votedList, searchResult) => {
    let arr = [];
    for (let i = 0; i < votedList; i++) {
      for (let j = 0; j < searchResult; j++) {
        if (votedList[i] !== searchResult[j]) arr.push(searchResult[j]);
      }
    }
    return arr;
  };

  return (
    <AppContext.Provider
      value={{
        listSearchResult,
        title,
        setTitle,
        setListSearchUrl,
        API_URL,
        selected,
        disabled,
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
