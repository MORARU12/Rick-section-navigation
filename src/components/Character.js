import React from "react";

const Character = ({ data, activeCharacter, setActiveCharacter }) => {
  const activeClass =
    activeCharacter === data.name ? "character-block--active" : "";
  return (
    <div className={`character-block ${activeClass}`} id={data.name}>
      <div>
        <img src={data.image} alt="" className="character-block__image" />
      </div>
      <div className="character-block__text">
        <h2>{data.name}</h2>
        <p>
          <b>Status</b>: {data.status}
        </p>
        <p>
          <b>Location</b>: {data.location ? data.location.name : "-"}
        </p>
        <p>
          <b>Species</b>: {data.species}
        </p>
        <p>
          <b>Dimension</b>: {data.origin.dimension || "-"}
        </p>
      </div>
    </div>
  );
};

export default Character;
