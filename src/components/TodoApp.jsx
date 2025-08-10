import React, { useCallback } from 'react'
import { useImmer } from 'use-immer'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import styles from '../styles/TodoApp.module.css'

export default function TodoApp() {
  const [todos, updateTodos] = useImmer([])

  const addTodo = useCallback((text, opts = {}) => {
    updateTodos((draft) => {
      const exists = draft.some((t) => t.text.toLowerCase() === text.toLowerCase())
      if (exists) {
        opts.onDuplicate?.()
        return
      }
      draft.push({
        id: crypto.randomUUID(),
        text: text.trim(),
        done: false,
        createdAt: new Date()
      })
    })
  }, [updateTodos])

  const deleteTodo = useCallback((id) => {
    updateTodos((draft) => {
      const idx = draft.findIndex((t) => t.id === id)
      if (idx !== -1) draft.splice(idx, 1)
    })
  }, [updateTodos])

  const toggleTodo = useCallback((id) => {
    updateTodos((draft) => {
      const target = draft.find((t) => t.id === id)
      if (target) target.done = !target.done
    })
  }, [updateTodos])

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Todo (useImmer)</h2>
      <TodoInput onAddTodo={addTodo} />
      <TodoList todos={todos} onToggleTodo={toggleTodo} onDeleteTodo={deleteTodo} />
    </div>
  )
}
