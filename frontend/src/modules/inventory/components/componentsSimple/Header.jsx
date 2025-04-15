import React from "react";
import Search from "../formComponents/Search";
import "../../styles/components/Header.css";

const Header = ({ title, subtitle, searchPlaceholder, onSearch, onAdd }) => {
  return (
    <div className="header-container">
      <div className="header-text">
        <h2 className="header-title">{title}</h2>
        {subtitle && <p className="header-subtitle">{subtitle}</p>}
      </div>
      <Search placeholder={searchPlaceholder} onSearch={onSearch} />
      {onAdd && (
        <button className="add-btn-header" onClick={onAdd}>
          Agregar
        </button>
      )}
    </div>
  );
};

export default Header;
