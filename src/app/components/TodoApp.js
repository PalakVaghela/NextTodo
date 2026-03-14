'use client'

import { useState } from 'react'
import { FaTrash, FaEdit, FaSave, FaTimes, FaStar } from 'react-icons/fa'
import {
  addTodo as addTodoAction,
  deleteTodo as deleteTodoAction,
  updateTodo as updateTodoAction,
  toggleImpTodo,
  togglecompletedTodo
} from '../actions/todo'

export default function TodoApp ({ initialTodos }) {
  // const [todo, setTodo] = useState("");
  const [title, setTitle] = useState('')
  const [note, setNote] = useState('')
  const [todos, setTodos] = useState(initialTodos || [])
  const [editingId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editNote, setEditNote] = useState('')

  async function addTodo () {
    if (title.trim() === '') return
    const newTodo = {
      id: crypto.randomUUID(),
      title: title,
      note: note.trim() || undefined,
      completed: false
    }
    setTodos([...todos, newTodo])
    setTitle('')
    setNote('')

    const formData = new FormData()
    formData.append('title', title)
    formData.append('note', note)
    await addTodoAction(formData)
  }

  async function deleteTodo (id) {
    try {
      setTodos(todos.filter(todo => todo.id !== id))
      await deleteTodoAction(id) // ← your server action
    } catch (err) {
      console.error('Failed to delete:', err)
    }
  }

  async function toggleImp (id) {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, important: !todo.important } : todo
    )
    setTodos(updatedTodos)
    try {
      await toggleImpTodo(id)
    } catch (err) {
      console.log('Failed to toggle important.')
    }
  }

  async function toggleCompleted (id) {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
    setTodos(updatedTodos)

    try {
      await togglecompletedTodo(id)
    } catch (err) {
      console.log('Failed to toggle complated.')
    }
  }

  // we have to first of all copy all prev true, false icons and then we have to apply change on existing. otherwise it will losse prev data.
  // we have written usestate in which we have todos so react will notice change in state chnages of todos means chnage in memory. not some values of todos. like todos has attribute.
  // so it will recognize only memory chnages new todo add and delete etc. that's why it will not just toggle it's attribute and trigger usestate. that's why we have to copy old value so that it recognize the chnages.

  async function handleUpdateTodo (id) {
    if (editTitle.trim() == '') return
    const updatedtodo = todos.map(todo =>
      todo.id === id ? { ...todo, title: editTitle, note: editNote } : todo
    )
    setTodos(updatedtodo)
    setEditId(null)
    try {
      await updateTodoAction(id, editTitle, editNote)
    } catch (err) {
      console.error('Failed to update:', err)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <div className='items-center justify-center dark:bg-black p-6 rounded-lg shadow-md w-96'>
        <h1 className='max-w-xs text-center text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50'>
          MY TODO
        </h1>

        <form onSubmit={e =>{
          e.preventDefault()
          addTodo()
          }}>

          <div className='max-w-sm p-6 bg-black border border-gray-500 my-2'>
            <input type='text' value={title} onChange={e => setTitle(e.target.value)} placeholder='Add a new title...' autoFocus
              className='w-full border p-2 rounded mb-4  dark:bg-zinc-700  focus:outline-none dark:text-white  focus:ring-blue-500'/>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder='Add details or notes here... (optional)' rows={2}
              className='w-full p-3 text-base border border-zinc-300 dark:border-zinc-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-15 dark:bg-zinc-700 dark:text-white'
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  addTodo()
                }
              }}/>
          </div>

          <button className='w-full bg-blue-500 text-white py-2 rounded' type='submit'>
            Add Todo
          </button>
        </form>

        <ul className='mt-4'>
          {todos.length === 0 ? (
            <p className='text-center text-gray-500 dark:text-gray-400 py-10'>
              No todos yet — add one above!
            </p>
          ) : (
            todos.map(todo => (
              <li key={todo.id} className='flex items-center justify-between border-b py-2'>
                <div className='flex items-start justify-between gap-3'>
                  <div className='flex-1'>
                    {editingId === todo.id ? (
                      <div className='flex flex-col gap-2'>
                        <input value={editTitle} onChange={e => setEditTitle(e.target.value)} className='border p-2 rounded'/>
                        <textarea value={editNote || ''} onChange={e => setEditNote(e.target.value)} className='border p-2 rounded'/>

                        <div className='flex gap-2'>
                          <button onClick={() => handleUpdateTodo(todo.id)} className='bg-green-500 text-white px-3 py-1 rounded'>
                            <FaSave className='text-green-700 hover:text-green-900' />
                          </button>

                          <button onClick={() => setEditId(null)} className='bg-gray-400 text-white px-3 py-1 rounded'>
                            <FaTimes className='text-red-500 hover:text-red-700' />
                          </button>
                        </div>

                      </div>
                    ) : (
                      <div>
                        <h3 className={`space-x-4 ${ todo.completed ? 'line-through' : ''}`}>
                          <input type='checkbox' checked={todo.completed}
                            onChange={() => {
                              toggleCompleted(todo.id)
                            }}/>
                          <span>{todo.title}</span>
                        </h3>

                        {todo.note && (
                          <p className='mt-1 text-sm text-gray-600 dark:text-gray-400'>
                            {todo.note}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className='flex gap-3 items-center'>
                  <button onClick={() => { toggleImp(todo.id) }}>
                    <FaStar color={todo.important ? 'gold' : 'grey'} />
                  </button>

                  <button onClick={() => {
                      setEditId(todo.id)
                      setEditTitle(todo.title)
                      setEditNote(todo.note)
                    }}>
                    <FaEdit className='text-blue-500 hover:text-blue-700' />
                  </button>

                  <button onClick={() => deleteTodo(todo.id)}>
                    <FaTrash className='text-red-500 hover:text-red-700' />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  )
}

// here we use setTodod(""). because here you can see below line....
// <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} placeholder="Add a new todo..." className="w-full border p-2 rounded mb-4"/>
// there is onchange so whenveer value will change assume user want to write "Buy milk" so user write B it will setTodo("B") -> so in todo = B. now value={todo} means what is inside todo will save in value so that
// in todo input list ot will show what is inside todo which is B. when user adds u it will again renders setTodod and we have not done setTodod("") so it will show Bu -> will save in {todo} variable and visible in input.
// now like that when user press enter we will save {todo} in taxt and then then add that in todolist then set setTodod("") so inpit will again set as blank.
// So like that we can control input component by react state.
