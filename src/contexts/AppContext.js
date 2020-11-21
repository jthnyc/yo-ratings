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
  let [upCount, setUpCount] = useState(0);
  let [downCount, setDownCount] = useState(0);

  //   console.log("SELECTED MOVIE IS: ", selected, "WITH ID: ", selected.imdbID);

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
      const selectedMovie = response.data;
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
  const openDetail = (id) => {
    setUrl(API_URL + `&i=${id}`);
  };

  const handleUpCount = () => {
    console.log("UP VOTE!");
    setUpCount((upCount += 1));
    console.log("UP COUNT: ", upCount);
  };

  const handleDownCount = () => {
    console.log("DOWN VOTE!");
    setDownCount((downCount += 1));
    console.log("DOWN COUNT: ", downCount);
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
        upCount,
        setUpCount,
        downCount,
        setDownCount,
        onOpenDetail: openDetail,
        onUpVote: handleUpCount,
        onDownVote: handleDownCount,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
