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
    // if current title matches any one of the existing titles in votedArr, set searchResult as the existing array instead of another api call
    const currentSearchTerm = title.toLowerCase();
    const isSearchednVotedOn = checkIfInVotedArr(currentSearchTerm, votedArr);

    if (isSearchednVotedOn) {
      const matchedResult = votedArr[isSearchednVotedOn[1]][currentSearchTerm];
      setListSearchResult([...matchedResult]);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listSearchUrl]);

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
    let obj = {};
    obj[id] = { up: true, down: true };
    // eslint-disable-next-line no-unused-expressions
    selectedMovie.up
      ? ((selectedMovie.up += 1), setDisabled({ ...disabled, obj }))
      : ((selectedMovie.up = 1), setDisabled({ ...disabled, obj }));

    // setting up a new array to account for the new votes
    const newResult = [];
    listSearchResult.forEach((movie) =>
      movie.imdbID === selectedMovie
        ? newResult.push(selectedMovie)
        : newResult.push(movie)
    );

    // initial set up should be [{searchTerm: [array of objects]}]
    const movieObj = {};
    movieObj[title] = [...newResult];

    // check if movie title is included in the votedArr list
    const selectedTitle = selectedMovie.Title.toLowerCase();
    const isInVotedArr = checkIfInVotedArr(selectedTitle, votedArr);

    if (isInVotedArr) {
      const index = isInVotedArr[1];
      let newArr = [];
      votedArr.forEach((obj, i) =>
        i === index ? newArr.push(movieObj) : newArr.push(obj)
      );
      setVotedArr([...newArr]);
    } else {
      setVotedArr([...votedArr, movieObj]);
    }
  };

  const handleDownCount = (id) => {
    const selected = listSearchResult.find((movie) => movie.imdbID === id);
    let obj = {};
    obj[id] = { up: true, down: true };
    // eslint-disable-next-line no-unused-expressions
    selected.down
      ? ((selected.down += 1), setDisabled({ ...disabled, obj }))
      : ((selected.down = 1), setDisabled({ ...disabled, obj }));

    const newResult = [];
    listSearchResult.forEach((movie) =>
      movie.imdbID === selected
        ? newResult.push(selected)
        : newResult.push(movie)
    );

    const movieObj = {};
    movieObj[title] = [...newResult];

    const selectedTitle = selected.Title.toLowerCase();
    const isInVotedArr = checkIfInVotedArr(selectedTitle, votedArr);

    if (isInVotedArr) {
      const index = isInVotedArr[1];
      const newArr = [];
      votedArr.forEach((obj, i) =>
        i === index ? newArr.push(movieObj) : newArr.push(obj)
      );
      setVotedArr([...newArr]);
    } else {
      setVotedArr([...votedArr, movieObj]);
    }
  };

  const checkIfInVotedArr = (selectedTitle, votedArr) => {
    for (let i = 0; i < votedArr.length; i++) {
      const filmObj = votedArr[i];
      const filmTitle = Object.keys(filmObj)[0].toLowerCase();
      if (selectedTitle.includes(filmTitle)) {
        return [true, i];
      }
    }
    return false;
  };

  return (
    <AppContext.Provider
      value={{
        listSearchResult,
        title,
        setTitle,
        setListSearchUrl,
        setSearchTermArr,
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
