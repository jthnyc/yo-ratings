import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import styled from "styled-components";

const MovieCard = ({ title, year, id, up, down, poster, onOpenDetail }) => {
  const { handleUpCount, handleDownCount } = useContext(AppContext);

  return (
    <MovieCardContainer>
      <li>
        <MovieDisplay>
          <MovieCardButton onClick={() => onOpenDetail(id)}>
            <Poster>
              <img src={poster} alt="film-poster" />
            </Poster>
            <p>
              {title} ({year})
            </p>
          </MovieCardButton>
        </MovieDisplay>

        <VotingContainer>
          <UpVote onClick={() => handleUpCount(id)}>
            <VoteCount>{up ? up : 0}</VoteCount>
            👍
          </UpVote>
          <DownVote onClick={() => handleDownCount(id)}>
            <VoteCount>{down ? down : 0}</VoteCount>👎
          </DownVote>
        </VotingContainer>
      </li>
    </MovieCardContainer>
  );
};

export default MovieCard;

// const [votes, setVotes] = useState({ up: 0, down: 0 });
// const { setCount, count } = useContext(AppContext);
// console.log("ID IN MOVIE CARD: ", id);

// const handleCount = (id, direction) => {
//   const countObj = count.hasOwnProperty(id) ? count[id] : { up: 0, down: 0 };
//   if (direction === "up") {
//     const updateUp = { ...countObj, up: (countObj.up += 1) };
//     setCount({ ...count, id: updateUp });
//   } else {
//     const updateDown = { ...countObj, down: (countObj.down += 1) };
//     setCount({ ...count, id: updateDown });
//   }
// };

const MovieCardContainer = styled.div`
  // border: 1px solid yellow;
  margin: 0.3rem 0.3rem;
  list-style: none;
  // width: 20em;
`;

const MovieDisplay = styled.div`
  display: flex;
  justify-content: center;
`;

const MovieCardButton = styled.button`
  background: #1a1b41;
  color: #f1ff37;
`;

const Poster = styled.div`
  // border: 1px solid lime;
  display: flex;
  justify-content: center;
`;

const VotingContainer = styled.div`
  // border: 1px dotted white;
  display: flex;
  justify-content: center;
  height: 50px;
`;

const UpVote = styled.button`
  border: 0.5px solid #f1ffe7;
  // border-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1a1b41;
  color: #baff29;
  border-radius: 1rem;
  width: 80px;
`;

const DownVote = styled.button`
  border: 0.5px solid #f1ffe7;
  // border-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  border-radius: 1rem;
  background-color: #1a1b41;
  color: #baff29;
`;

const VoteCount = styled.h5`
  font-size: 20px;
`;
