import React, { useEffect } from "react";

const Character = ({
  data,
  activeCharacter,
  setActiveCharacter,
  pageHeight = 100,
  refs,
}) => {
  const activeClass =
    activeCharacter === data.name ? "character-block--active" : "";
  const observerMargin = Math.floor(pageHeight / 2);

  useEffect(() => {
    const observerConfig = {
      rootMargin: `-${
        pageHeight % 2 === 0 ? observerMargin - 1 : observerMargin
      }px 0px -${observerMargin}px 0px`,
    };
    const handleIntersection = function (entries) {
      entries.forEach((entry) => {
        if (entry.target.id !== activeCharacter && entry.isIntersecting) {
          setActiveCharacter(entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(
      handleIntersection,
      observerConfig
    );
    observer.observe(refs[data.name].current);
    return () => observer.disconnect(); // Clenaup the observer if component unmount.
  }, [
    activeCharacter,
    setActiveCharacter,
    observerMargin,
    refs,
    data,
    pageHeight,
  ]);

  return (
    <div
      className={`character-block ${activeClass}`}
      id={data.name}
      ref={refs[data.name]}
    >
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

// import { React, useEffect, useRef } from "react";

// const Character = ({
//   data,
//   activeCharacter,
//   setActiveCharacter,
//   pageHeight = 100,
//   refs,
// }) => {
// const activeClass =
//   activeCharacter === data.name ? "character-block--active" : "";
// const observerMargin = Math.floor(pageHeight / 2);

// useEffect(() => {
//   const observerConfig = {
//     rootMargin: `-${
//       pageHeight % 2 === 0 ? observerMargin - 1 : observerMargin
//     }px 0px -${observerMargin}px 0px`,
//   };

//   const handleIntersection = (entries) => {
//     entries.forEach((entry) => {
//       if (entry.target.id !== activeCharacter && entry.isIntersecting) {
//         setActiveCharacter(entry.target.id);
//       }
//     });
//   };
//   const observer = new IntersectionObserver(
//     handleIntersection,
//     observerConfig
//   );
//   observer.observe(refs[data.name].current);
//   // return () => observer.disconnect();
// }, [activeCharacter, setActiveCharacter, data, observerMargin]);

//   return (
//     <div className={`character-block ${activeClass}`} id={data.name}>
//       <div>
//         <img src={data.image} alt="" className="character-block__image" />
//       </div>
//       <div className="character-block__text">
//         <h2>{data.name}</h2>
//         <p>
//           <b>Status</b>: {data.status}
//         </p>
//         <p>
//           <b>Location</b>: {data.location ? data.location.name : "-"}
//         </p>
//         <p>
//           <b>Species</b>: {data.species}
//         </p>
//         <p>
//           <b>Dimension</b>: {data.origin.dimension || "-"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Character;
