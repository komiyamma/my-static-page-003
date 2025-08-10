import React from 'react'
import styles from '../styles/TodoApp.module.css'

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={styles.item}>
      <label className={styles.itemLabel}>
        <input
          type="checkbox"
          checked={todo.done}
          onChange={() => onToggle(todo.id)}
          aria-label={`mark ${todo.text} as ${todo.done ? 'not done' : 'done'}`}
        />
        <span className={todo.done ? styles.textDone : styles.text}>
          {todo.text}
        </span>
      </label>
      <button className={styles.deleteBtn} onClick={() => onDelete(todo.id)} aria-label="削除">
        削除
      </button>
    </li>
  )
}
