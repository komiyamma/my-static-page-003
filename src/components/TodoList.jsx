import React from 'react'
import TodoItem from './TodoItem'
import styles from '../styles/TodoApp.module.css'

export default function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  if (!todos.length) {
    return <p className={styles.empty}>タスクはまだありません。</p>
  }
  return (
    <ul className={styles.list}>
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} onToggle={onToggleTodo} onDelete={onDeleteTodo} />
      ))}
    </ul>
  )
}
