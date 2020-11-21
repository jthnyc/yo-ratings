import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import styled from "styled-components";

const SearchBar = () => {
  const { title, setTitle, setUrl, API_URL } = useContext(AppContext);

  return (
    <Wrapper>
      <SearchForm
        onSubmit={(e) => {
          setUrl(API_URL + `&s=${title}&type=movie`);
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
                onChange={(e) => setTitle(e.target.value)}
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
  background-color: #c2e7da;
  border-radius: 0.5em;
  box-shadow: 0 0 10px #c2e7da;
`;

const SearchForm = styled.form`
  // background-color: white;
  // // border: 2px solid red;
  // height: 90px;
  // width: 100%;
  // outline: none;
`;

const SearchInputContainer = styled.div`
  display: flex;
  // flex-direction: column;
  text-align: left;
`;

const SearchInputLabel = styled.label`
  font-size: 18px;
  padding-bottom: 10px;
`;

const SearchInputFieldContainer = styled.div`
  display: flex;
  width: 100%;
`;

const SearchInputField = styled.input`
  border: transparent;
  border-bottom: 1px solid #1a1b41;
  width: 95%;
  outline: none;
  // margin-left: 15px;
  font-size: 18px;
  background-color: #c2e7da;
`;

const Button = styled.button`
  border-style: none;
  background-color: #c2e7da;
  height: 90px;
  width: 100%;
  outline: none;
`;
