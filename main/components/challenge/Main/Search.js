import React, { useState } from "react";
import Link from "next/dist/client/link";
//css
import { Icon } from "semantic-ui-react";
import ImageStyle from "../../../styles/challenge/Input.module.css";
import { debounce } from "../../../util/axios";
import axios from "axios";

const Search = ({ challenges, user }) => {
  const [filteredChallnege, setFilteredChallenge] = useState([]);
  const [searchString, setSearchString] = useState("");
  const handleClick = async () => {
    const {
      data: { challenges },
    } = await axios.get("/api/challenge/search?title=" + searchString);
    setFilteredChallenge(challenges);
  };
  return (
    <>
      <Link>
        <div className={ImageStyle.search}>
          <Icon name="search" size="large" />
          <input
            type="text"
            value={searchString}
            onChange={(e) => {
              setSearchString(e.currentTarget.value);
            }}
          />
          <button onClick={handleClick}>검색</button>
        </div>
      </Link>
    </>
  );
};

export default Search;
