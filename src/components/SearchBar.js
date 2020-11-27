import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import styled from "styled-components";
import { useDebounce } from "use-debounce";

const SearchBar = () => {
  const { title, setTitle, setListSearchUrl, API_URL } = useContext(AppContext);
  const [debouncedTitle] = useDebounce(title, 200);
  return (
    <Wrapper>
      <SearchForm
        onSubmit={(e) => {
          setListSearchUrl(API_URL + `&s=${debouncedTitle}&type=movie`);
          e.preventDefault();
        }}
      >
        <Button type="submit">
          <SearchInputContainer>
            <SearchInputLabel htmlFor="inputTitle">
              Movie Title
            </SearchInputLabel>
            <SearchInputFieldContainer>
              <SearchInputField
                type="search"
                value={title}
                placeholder="Search Movies"
                onFocus={(e) => (e.target.placeholder = "")}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </SearchInputFieldContainer>
          </SearchInputContainer>
        </Button>
      </SearchForm>
    </Wrapper>
  );
};

export default SearchBar;

const Wrapper = styled.div`
  // border: 1px solid black;
  border-style: none;
  margin: 2em 2em;
  padding: 2em 2em;
  background-color: var(--dark-blue);
  border-radius: 0.5em;
  box-shadow: 0 0 10px var(--teal-green);
`;

const SearchForm = styled.form`
  // background-color: white;
  // // border: 2px solid red;
  // height: 90px;
  // width: 100%;
  // outline: none;
`;

const SearchInputContainer = styled.div`
  // border: 1px solid gold;
  display: flex;
  height: 80%;
  text-align: left;
  align-items: center;
`;

const SearchInputLabel = styled.h5`
  // border: 1px solid red;
  height: 100%;
  display: flex;
  flex-direction: column-reverse;
  font-size: 18px;
  padding-bottom: 10px;
`;

const SearchInputFieldContainer = styled.div`
  display: flex;
  width: 100%;
  height: 5em;
  // border: 1px solid green;
`;

const SearchInputField = styled.input`
  border: transparent;
  // border-bottom: 1px solid var(--dark-blue);;
  border-bottom: 1px solid var(--light-green);
  width: 95%;
  outline: none;
  font-size: 18px;
  background-color: var(--dark-blue);
  color: var(--light-green);
`;

const Button = styled.button`
  border-style: none;
  // background-color: var(--teal-green);;
  color: var(--teal-green);
  background-color: var(--dark-blue);
  height: 90px;
  width: 100%;
  outline: none;
`;
