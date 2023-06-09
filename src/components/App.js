import React, { useState, useEffect, createRef } from "react";
import { useQuery } from "urql";
import gql from "graphql-tag";

import "./app.css";
import "typeface-roboto-mono";

import Navigation from "./Navigation";
// import { Loading } from "./Loading";
import Character from "./Character";
import { Loading } from "./Loading";
import { Footer } from "./Footer";
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

  const [pageHeight, setPageHeight] = useState();

  useEffect(() => {
    setPageHeight(window.innerHeight);
    window.addEventListener("resize", (e) => {
      setTimeout(() => {
        setPageHeight(window.innerHeight);
      }, 300);
    });
  }, []);

  if (res.fetching || typeof res.data === "undefined") {
    return <Loading />;
  } else {
    const characters = res.data.characters.results.slice(0, 9);
    const refs = characters.reduce((refsObj, character) => {
      refsObj[character.name] = createRef();
      return refsObj;
    }, {});

    const handleClick = (name) => {
      refs[name].current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    };
    return (
      <>
        <div className="page-wrapper">
          <aside className="sidebar">
            <Navigation
              items={characters}
              activeCharacter={activeCharacter}
              handleClick={handleClick}
            />
          </aside>
          <div className="content">
            <div className="page-intro">
              <h1 className="page-title">Check out these cool Rick&apos;s!</h1>
              <p>
                This is an example of using Intersection Observer API with
                React.
                <br />
                I&apos;ve created this simple app to show how you can create
                side navigation that will detect current visible section.
              </p>
            </div>
            {characters.map((item) => {
              return (
                <Character
                  key={item.name}
                  activeCharacter={activeCharacter}
                  data={item}
                  setActiveCharacter={setActiveCharacter}
                  pageHeight={pageHeight}
                  refs={refs}
                />
              );
            })}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default App;
