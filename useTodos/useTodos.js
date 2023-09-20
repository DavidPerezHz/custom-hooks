import { useEffect, useReducer } from "react"
import { todoReducer } from "./todoReducer"

const initialState = [
  // {
  //   id: new Date().getTime(),
  //   description: 'Recolectar la piedra del Alma',
  //   done: false
  // },
]

const init = () => {
  return JSON.parse(localStorage.getItem('todos')) || []
}

export const useTodos = () => {

  const [todos, dispatch] = useReducer( todoReducer, initialState, init)

  const handleNewTodo = ( todo ) => {
    console.log(todo)
    const action = {
      type: '[TODO] Add Todo',
      payload: todo
    }
    dispatch(action)
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify( todos ))
  }, [todos])
  

  const handleDeleteTodo = ( id ) => {
    const action = {
      type: '[TODO] Remove Todo',
      payload: {id}
    }
    dispatch(action)
  }

  const handleToggleTodo = ( id ) => {
    const action = {
      type: '[TODO] Toggle Todo',
      payload: {id}
    }
    dispatch(action)
  }


  const pendingTodoCount = todos.filter(todo => !todo.done).length

  return {
    todos,
    handleNewTodo,
    handleDeleteTodo,
    handleToggleTodo,
    todosCount: todos.length,
    pendingTodoCount,
  }
}