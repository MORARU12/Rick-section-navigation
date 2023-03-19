import React, { useState, useEffect, createRef } from "react";
import { useQuery } from "urql";
import gql from "graphql-tag";

import "./app.css";
import "typeface-roboto-mono";

import Navigation from "./Navigation";
// import { Loading } from "./Loading";
import Character from "./Character";
// import { Footer } from "./Footer";

const getCharacters = gql`
  query AllCharacters {
    characters(filter: { name: "rick" }) {
      info {
        count
      }
      results {
        id
        name
        image
        species
        status
        location {
          name
        }
        origin {
          dimension
        }
      }
    }
  }
`;

function App() {
  const [res] = useQuery({
    query: getCharacters,
  });

  const [activeCharacter, setActiveCharacter] = useState();

  if (res.fetching || typeof res.data === "undefined") {
    return <div>Loading...</div>;
  } else {
    const characters = res.data.characters.results.slice(0, 2);
    return (
      <>
        <div className="page-wrapper">
          <aside className="sidebar">
            <Navigation items={characters} activeCharacter={activeCharacter} />
          </aside>
          <div className="content">
            {characters.map((item) => {
              return (
                <Character
                  key={item.name}
                  activeCharacter={activeCharacter}
                  data={item}
                  setActiveCharacter={setActiveCharacter}
                />
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default App;
