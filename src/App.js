import AppContextProvider from "./contexts/AppContext";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import Global from "./Global";

function App() {
  return (
    <AppContextProvider>
      <Global />
      <SearchBar />
      <MovieList />
    </AppContextProvider>
  );
}

export default App;
