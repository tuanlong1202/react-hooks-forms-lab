import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, onSetItems }) {
  const [listItems, setListItems] = useState(items);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [itemSearch, setItemSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [formData, setFormData] = useState({
    id : uuid(),
    name:"",
    category: "Produce",
  })

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
    setIsSearch(false);
  }

  function handleSearchChange(event) {
    setItemSearch(event.target.value);
    setIsSearch(true);
  }

  function handleItemFormSubmit(event) {
    event.preventDefault();
    event.target.reset();
    if (formData.name !== "") {
      addElement(formData);
      setFormData({
        id:uuid(),
        name:"",
        category:"Product",
      });
    }
  }

  function addElement(element) {
    setListItems([...listItems, element]);
  } 

  function handleElementChange (event){
    const name = event.target.name;
    let value = event.target.value;
  
    if (event.target.type === "checkbox"){
      value = event.target.checked;
    }
    setFormData({
      ...formData,
      [name]:value,
    });
  }

  const itemsToDisplay = listItems.filter((item) => {
    if (isSearch) {
      return ((item.name === itemSearch) || (item.name.indexOf(itemSearch) >=0));
    } else {
        if (selectedCategory === "All") return true;

        return (item.category === selectedCategory);
    }
  });

  return (
    <div className="ShoppingList">
      <ItemForm resetData={formData} onItemFormSubmit={handleItemFormSubmit} elementChange={handleElementChange}/>
      <Filter search={itemSearch} onSearchChange={handleSearchChange} onCategoryChange={handleCategoryChange} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
