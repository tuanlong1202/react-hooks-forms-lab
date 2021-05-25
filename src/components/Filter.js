import React from "react";

function Filter(prop) {
  return (
    <div className="Filter">
      <input type="text" name="search" placeholder="Search..." onChange={prop.onSearchChange} value={prop.search} />
      <select name="filter" onChange={prop.onCategoryChange}>
        <option value="All">Filter by category</option>
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        <option value="Dessert">Dessert</option>
      </select>
    </div>
  );
}

export default Filter;
