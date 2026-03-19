"use client";

import { useState } from "react";
import { FaTrash, FaEdit, FaSave, FaTimes, FaStar } from "react-icons/fa";
import { addTodo as addTodoAction, deleteTodo as deleteTodoAction, updateTodo as updateTodoAction, toggleImpTodo, togglecompletedTodo } from "../actions/todo";

export default function TodoApp({ initialTodos, filterType }) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [todos, setTodos] = useState(initialTodos || []);
  const [editingId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editNote, setEditNote] = useState("");
  const [showForm, setShowForm] = useState(false);

  async function addTodo() {
    if (title.trim() === "") return;
    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      note: note.trim() || undefined,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setTitle("");
    setNote("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("note", note);
    await addTodoAction(formData);
  }

  async function deleteTodo(id) {
    try {
      setTodos(todos.filter((todo) => todo.id !== id));
      await deleteTodoAction(id);
    } catch (err) {
      console.error("Failed to delete:", err);
    }
  }

  async function toggleImp(id) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, important: !todo.important } : todo,
    );
    setTodos(updatedTodos);
    try {
      await toggleImpTodo(id);
    } catch (err) {
      console.log("Failed to toggle important.");
    }
  }

  async function toggleCompleted(id) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(updatedTodos);

    try {
      await togglecompletedTodo(id);
    } catch (err) {
      console.log("Failed to toggle complated.");
    }
  }

  // we have to first of all copy all prev true, false icons and then we have to apply change on existing. otherwise it will losse prev data.
  // we have written usestate in which we have todos so react will notice change in state chnages of todos means chnage in memory. not some values of todos. like todos has attribute.
  // so it will recognize only memory chnages new todo add and delete etc. that's why it will not just toggle it's attribute and trigger usestate. that's why we have to copy old value so that it recognize the chnages.

  async function handleUpdateTodo(id) {
    if (editTitle.trim() == "") return;
    const updatedtodo = todos.map((todo) =>
      todo.id === id ? { ...todo, title: editTitle, note: editNote } : todo,
    );
    setTodos(updatedtodo);
    setEditId(null);
    try {
      await updateTodoAction(id, editTitle, editNote);
    }catch (err) {
      console.error("Failed to update:", err);
    }
  }

  const filteredtodos = todos.filter((todo) => {
    if (filterType == "important") return todo.important;
    if (filterType == "completed") return todo.completed;
    return true;
  });

  return (
    <div className="flex min-h-screen justify-center font-sans">
      <div className="w-full max-w-6xl mx-auto flex flex-col">
        <div className="flex items-center justify-between mb-10 w-full">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">
            Taskly
          </h1>
          <h1 className="text-xl font-medium">Total : {todos.length}</h1>
          {!showForm &&
            filterType !== "important" &&
            filterType !== "completed" && (
              <button
                className="flex items-center gap-2 bg-indigo-800 hover:bg-indigo-700 text-white rounded-xl py-2 px-5 shadow-lg shadow-indigo-500/20 transition-all active:scale-95 font-bold text-lg"
                onClick={() => {
                  setShowForm(true);
                }}>
                ADD NEW
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
              </button>
            )}
        </div>

        {showForm && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <form
              className="w-full p-6 bg-white/3 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl"
              onSubmit={(e) => {
                e.preventDefault();
                addTodo();
              }}
            >
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add a new title..." autoFocus
                className="w-full border p-2 rounded mb-1.5  dark:bg-zinc-700  focus:outline-none dark:text-white  focus:ring-blue-500"
              />
              <textarea value={note} onChange={(e) => setNote(e.target.value)}
                placeholder="Add details or notes here... (optional)" rows={2}
                className="w-full p-3 mb-1.5 text-base border border-zinc-300 dark:border-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-15 dark:bg-zinc-700 dark:text-white"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    addTodo();
                  }
                }}
              />
              <div className="flex gap-2">
                <button
                  className="flex-1 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-sm tracking-widest shadow-[0_0_20px_rgba(16,185,129,0.1)] hover:bg-emerald-500/20 hover:border-emerald-500/60 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] transition-all duration-200 active:scale-95"
                  type="submit"
                >
                  Add Todo
                </button>
                <button
                  className="flex-1 px-4 py-3 rounded-xl text-red-400 font-bold text-sm tracking-widest border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 hover:border-red-500/40 transition-all duration-200"
                  onClick={() => {
                    setShowForm(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <ul className="mt-8 space-y-4 w-full max-w-7xl mx-auto">
          {filteredtodos.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 py-10">
              No todos yet — capture your thoughts above.
            </p>
          ) : (
            filteredtodos.map((todo) => (
              <li
                key={todo.id}
                className="group relative flex flex-col w-full p-5 rounded-2xl bg-white/3 backdrop-blur-xl border border-white/30 transition-all duration-300 hover:bg-white/[0.07] hover:border-indigo-500/70"
              >
                {/* Top Section: Title and Important Star */}
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-center gap-4 flex-1">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleCompleted(todo.id)}
                      className="w-5 h-5 rounded-b-lg border-white/20 bg-black/40 checked:bg-indigo-500 cursor-pointer accent-indigo-500"
                    />

                    {editingId === todo.id ? (
                      <div className="flex flex-col gap-2 w-full pr-10">
                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="bg-black/40 border border-white/10 p-2 rounded-lg text-white focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    ) : (
                      <h3
                        className={`text-xl font-medium tracking-tight ${todo.completed ? "text-zinc-500 line-through" : "text-zinc-100"}`}
                      >
                        {todo.title}
                      </h3>
                    )}
                  </div>

                  {/* Upper Right Corner: Important Star */}
                  <button
                    onClick={() => toggleImp(todo.id)}
                    className="p-2 rounded-lg transition-colors hover:bg-white/5"
                  >
                    <FaStar
                      className={`text-xl ${todo.important ? "text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]" : "text-white/20"}`}
                    />
                  </button>
                </div>

                {/* Note Section */}
                {todo.note && !editingId && (
                  <p className="mt-2 ml-9 text-sm text-zinc-400 leading-relaxed max-w-2xl">
                    {todo.note}
                  </p>
                )}

                {/* Edit Note Field*/}
                {editingId === todo.id && (
                  <textarea
                    value={editNote || ""}
                    onChange={(e) => setEditNote(e.target.value)}
                    className="mt-2 ml-9 bg-black/40 border border-white/10 p-2 rounded-lg text-zinc-300 text-sm focus:outline-none focus:border-indigo-500"
                  />
                )}

                {/* This div starts at opacity-0 and slides up slightly on group-hover */}
                {/* <div className="flex gap-2 overflow-hidden max-h-0 opacity-0 transition-all duration-500 ease-in-out group-hover:max-h-20 group-hover:opacity-100 group-hover:mt-4"> */}
                <div className="ml-9 overflow-hidden max-h-0 border-t border-white/5 flex items-center gap-4 opacity-0 transition-all duration-500 ease-in-out group-hover:max-h-20 group-hover:opacity-100 group-hover:translate-y-0 group-hover:mt-4">
                  {editingId === todo.id ? (
                    <>
                      <button
                        onClick={() => handleUpdateTodo(todo.id)}
                        className="flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                      >
                        <FaSave /> SAVE CHANGES
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-300"
                      >
                        <FaTimes /> CANCEL
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditId(todo.id);
                          setEditTitle(todo.title);
                          setEditNote(todo.note);
                        }}
                        className="flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300"
                      >
                        <FaEdit /> EDIT TASK
                      </button>
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-400"
                      >
                        <FaTrash /> DELETE
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

// here we use setTodod(""). because here you can see below line....
// <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="Add a new todo..." className="w-full border p-2 rounded mb-4"/>
// there is onchange so whenveer value will change assume user want to write "Buy milk" so user write B it will setTodo("B") -> so in todo = B. now value={todo} means what is inside todo will save in value so that
// in todo input list ot will show what is inside todo which is B. when user adds u it will again renders setTodod and we have not done setTodod("") so it will show Bu -> will save in {todo} variable and visible in input.
// now like that when user press enter we will save {todo} in taxt and then then add that in todolist then set setTodod("") so inpit will again set as blank.
// So like that we can control input component by react state.
// in onClick we cannot pass direct function like onClick={setForm()} because onclick ecpect function. this will give function so during rendering in onClick var. it will call the function so function will ececute before clicking...
//  Thats why by passing it in aero function. so during rendering it just define the aero function and onClick the function will called.
// functionName()  → run now
// functionName    → run later
// () => functionName() → run later when event happens
