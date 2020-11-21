import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import styled from "styled-components";

const MovieCard = ({
  title,
  year,
  id,
  poster,
  onOpenDetail,
  onUpVote,
  onDownVote,
}) => {
  const { upCount, downCount } = useContext(AppContext);
  return (
    <MovieCardContainer>
      <li>
        <Poster>
          <img src={poster} alt="film-poster" />
        </Poster>
        <div>
          <p>
            {title} ({year})
          </p>
        </div>
        <button onClick={() => onOpenDetail(id)}>Details</button>
        <VotingContainer>
          <UpVote onClick={onUpVote}>
            <VoteCount>{upCount}</VoteCount>👍
          </UpVote>
          <DownVote onClick={onDownVote}>
            <VoteCount>{downCount}</VoteCount>👎
          </DownVote>
        </VotingContainer>
      </li>
    </MovieCardContainer>
  );
};

export default MovieCard;

const MovieCardContainer = styled.div`
  border: 1px solid yellow;
  list-style: none;
  // width: 20em;
`;

const Poster = styled.div`
  border: 1px solid lime;
  display: flex;
  justify-content: center;
`;

const VotingContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 1px dotted white;
`;

const UpVote = styled.button`
  border: 1px solid pink;
  display: flex;
  background-color: #f1ffe7;
`;

const DownVote = styled.button`
  border: 1px solid orange;
  // border-style: none;
  display: flex;
  width: 50px;
  background-color: #f1ffe7;
`;

const VoteCount = styled.h5`
  font-size: 20px;
`;
