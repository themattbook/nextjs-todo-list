import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import TodoCard from "./TodoCard";
import { doc, setDoc, deleteField, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import useFetchTodos from "../hooks/fetchTodos";

export default function UserDashboard() {
  const { userInfo, currentUser } = useAuth();
  const [edit, setEdit] = useState(null);
  const [todo, setTodo] = useState("");
  const [edittedValue, setEdditedValue] = useState("")

  const { todos, setTodos, loading, error } = useFetchTodos();
  const date = new Date();

  async function handleAddTodo() {
    if (!todo) { return }
    const newKey = Object.keys(todos).length === 0 ? 1 : Math.max(...Object.keys(todos)) + 1
    setTodos({ ...todos, [newKey]: todo })
    const userRef = doc(db, 'users', currentUser.uid)
    await setDoc(userRef, {
      'todos': {
        [newKey]: todo
      }
    }, { merge: true })
    setTodo('')
  }

  function handleAddEdit(todoKey) {
    return () => {
      setEdit(todoKey)
      setEdditedValue(todos[todoKey])
    }
  }

  async function handleEditTodo() {
    if (!edittedValue) { return }
    const newKey = edit
    setTodos({ ...todos, [newKey]: edittedValue })
    const userRef = doc(db, 'users', currentUser.uid)
    await setDoc(userRef, {
        'todos': {
            [newKey]: edittedValue
        }
    }, { merge: true })
    setEdit(null)
    setEdditedValue("")
  }

  function handleDelete(todoKey) {
    return async () => {
        const tempObj = { ...todos }
        delete tempObj[todoKey]

        setTodos(tempObj)
        const userRef = doc(db, 'users', currentUser.uid)
        await setDoc(userRef, {
            'todos': {
                [todoKey]: deleteField()
            }
        }, { merge: true })

    }
}

  return (
    <div className="w-full max-w-[100ch] text-xs sm:text-sm mx-auto flex flex-col flex-1 gap-3 sm:gap-5">
      <div className="flex items-stretch rounded-md">
        <input
          type="text"
          className="outline-none p-4 text-base sm:text-lg text-gray-700 rounded-l-md flex-1"
          placeholder="Enter todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          onClick={handleAddTodo}
          className="w-fit px-4 sm:px-6 py-2 sm:py-4 bg-pink-500 text-white hover:bg-pink-300 duration-300 font-medium text-base rounded-r-md"
        >
          Add
        </button>
      </div>
      {loading && (
        <div className="flex-1 text-white grid place-items-center">
          <i className="fa-solid fa-spinner animate-spin text-6xl"></i>
        </div>
      )}
      {!loading && (
        <>
          {Object.keys(todos).map((todo, i) => {
            return <TodoCard handleEditTodo={handleEditTodo} key={i} handleAddEdit={handleAddEdit} edittedValue={edittedValue} setEdditedValue={setEdditedValue} handleDelete={handleDelete} edit={edit} todoKey={todo}>{todos[todo]}</TodoCard>;
          })}
        </>
      )}
    </div>
  );
}
