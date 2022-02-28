import React from "react";
import { useState, useEffect } from "react";
import "./styles.css";
import List from "./List";
import DeleteIcon from "@mui/icons-material/Delete";

const getLocalStorage = () => {
  let list = localStorage.getItem("todolist");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("todolist")));
  } else {
    return [];
  }
};

export default function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isIdCheck, setIsIdCheck] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let mydiv = "good";
    setList([
      ...list,
      {
        id: new Date().getTime().toString(),
        useclass: "no-line",
        divclass: mydiv,
        useicon: "iconcheck",
        todo: name
      }
    ]);
    setName("");
  };
  const removeItem = (id) => {
    let newItem = list.filter((item) => item.id !== id);
    setList(newItem);
  };

  const handleIdCheck = (id) => {
    setIsIdCheck(!isIdCheck);
    let useclass = isIdCheck ? "line-through" : "no-line";
    let useicon = isIdCheck ? "iconchecked" : "iconcheck";
    setList(
      list.map((item) => {
        if (item.id === id) {
          return { ...item, useclass: useclass, useicon: useicon };
        }
        return item;
      })
    );
  };

  const completeHandle = (addclass) => {
    setIsComplete(true);
    setList(
      list.map((item) => {
        if (item.useclass === addclass) {
          return { ...item, divclass: "nonedisplay" };
        } else {
          return { ...item, divclass: "good" };
        }
      })
    );
  };

  const activeHandle = (addclass) => {
    setIsComplete(false);
    setList(
      list.map((item) => {
        if (item.useclass === addclass) {
          return { ...item, divclass: "nonedisplay" };
        } else {
          return { ...item, divclass: "good" };
        }
      })
    );
  };

  const allHandle = () => {
    setIsComplete(false);
    setList(
      list.map((item) => {
        if (item.useclass === "line-through") {
          return { ...item, divclass: "good" };
        } else {
          return { ...item, divclass: "good" };
        }
      })
    );
  };

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(list));
  }, [list]);

  return (
    <div className="App">
      <h3>#todo</h3>
      <div className="btn-container">
        <button className="btn-right" onClick={allHandle}>
          All
        </button>
        <button
          className="btn-right"
          onClick={() => activeHandle("line-through")}
        >
          Active
        </button>
        <button onClick={() => completeHandle("no-line")}>Completed</button>
      </div>
      <div className="input-container">
        <form>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            Add
          </button>
        </form>
      </div>
      <List
        list={list}
        isComplete={isComplete}
        handleIdCheck={handleIdCheck}
        removeItem={removeItem}
      />

      {list.length > 0 &&
      <div className="delete-container">
        <p onClick={() => setList([])}>Delete</p>
        <DeleteIcon />
      </div>
      }
    </div>
  );
}
