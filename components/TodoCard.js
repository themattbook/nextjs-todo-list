import React from "react";

export default function TodoCard(props) {
  const { children, edit, handleAddEdit, handleEditTodo, edittedValue, setEdditedValue, todoKey, handleDelete  } = props;
  return (
    <div className="p-4 relative flex items-stretch border border-solid border-rose-500 text-white sm:text-lg rounded-lg">
      <div className="flex flex-1 font-bold">
        {!(edit === todoKey) ? <>{children}</> : (
          <input className="bg-inherit text-white p-4 outline-none flex-1" value={edittedValue} onChange={(e) => setEdditedValue(e.target.value)} />
        )}
      </div>
      <div className="flex items-center">
        {(edit === todoKey) ? <i onClick={handleEditTodo} className="fa-solid fa-check duration-300 hover:scale-125 hover:animate-pulse px-4 cursor-pointer"></i> : <i className="fa-solid fa-pencil duration-300 hover:rotate-45 px-4 cursor-pointer" onClick={handleAddEdit(todoKey)}></i>}
        <i onClick={handleDelete(todoKey)} className="fa-solid fa-trash-can duration-300 hover:scale-150 px-4 cursor-pointer"></i>
      </div>
    </div>
  );
}
