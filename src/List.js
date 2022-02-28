import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

export default function List({ list, removeItem, handleIdCheck, isComplete }) {
  console.log(list);
  return (
    <div className="list-container">
      {list.map((item) => {
        const { id, todo, useclass, useicon, divclass } = item;

        return (
          <div className={divclass} key={id}>
            <div className="check-container">
              <div className="check" onClick={() => handleIdCheck(id)}>
                <div className={useicon}></div>
              </div>
              <p className={useclass}>{todo}</p>
            </div>
            <div
              className="delete-todo-container"
              onClick={() => removeItem(id)}
            >
              {isComplete && <DeleteIcon />}
            </div>
          </div>
        );
      })}
    </div>
  );
}
