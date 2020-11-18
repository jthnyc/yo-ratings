import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
// import "./App.css";
import AppContextProvider from "./contexts/AppContext";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <header className="App-header">
          <SearchBar />
          <MovieList />
        </header>
      </AppContextProvider>
    </div>
  );
}

export default App;