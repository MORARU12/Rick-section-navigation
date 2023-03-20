import React from "react";

const Navigation = ({ items, activeCharacter, handleClick }) => {
  const renderItems = () => {
    return items.map((item) => {
      const activeClass =
        activeCharacter === item.name ? "navigation-list__item--active" : "";
      return (
        <li
          key={item.name}
          id={item.name}
          className={activeClass}
          onClick={() => handleClick(item.name)}
        >
          {item.name}
        </li>
      );
    });
  };

  return <ul className="navigation-list">{renderItems()}</ul>;
};

export default Navigation;
