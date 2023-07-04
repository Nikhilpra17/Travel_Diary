import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) => items.map((item) => item.id === id ? {...item, packed: !item.packed} : item));
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackagingList items={items} handleDeleteItems={handleDeleteItems}  handleToggleItem={handleToggleItem} />
      <Stats items = {items}/>
    </div>
  );
}

function Logo() {
  return <h1>🏖 Travel Diary 🏔</h1>;
}

function Form({ handleAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    if (!description) return;
    e.preventDefault();

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    handleAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <p>What do you need for your trip</p>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Enter Items..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackagingList({ items, handleDeleteItems, handleToggleItem }) {
  const[sortBy, setSortBy] = useState("input");

  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            handleDeleteItems={handleDeleteItems}
            handleToggleItem = {handleToggleItem}
          />
        ))}
      </ul>
        <div className="actions">
          <select value={sortBy} onChange ={e =>setSortBy(e.target.value)}>
            <option value= "input"> Sort by Input order </option>
            <option value= "description"> Sort by description </option>
            <option value= "packed"> Sort by Packed status </option>
          </select>
        </div>
    </div>
  );
}

function Stats({items}) {

  const nums = items.length;
  const numPacked = items.filter( item => item.packed).length;
  const percent = Math.round((numPacked/nums) * 100) ;
  


  return <div className="stats" >
    <em>
      {percent === 100 ? "You are ready to fly 🛫 " :
      `You Have ${nums} items on your list, and you already packed ${numPacked} (${percent}%)`}</em>
  </div>;
}

function Item({ item, handleDeleteItems, handleToggleItem }) {


  return (
    <li>
      <input type="checkbox" value = {item.packed} onChange = {()=>{handleToggleItem(item.id)}}/>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDeleteItems(item.id)}>
        <span>❌</span>
      </button>
    </li>
  );
}
