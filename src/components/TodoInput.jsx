import React, { useState } from 'react'
import styles from '../styles/TodoApp.module.css'

export default function TodoInput({ onAddTodo }) {
  const [text, setText] = useState('')
  const [error, setError] = useState(null)

  const validate = (value) => {
    const v = value.trim()
    if (!v) return { type: 'validation', message: 'タスクを入力してください。' }
    if (v.length > 200) return { type: 'validation', message: '200文字以内で入力してください。' }
    return null
  }

  const handleAdd = () => {
    const err = validate(text)
    if (err) {
      setError(err)
      // 自動消去
      setTimeout(() => setError(null), 2500)
      return
    }
    onAddTodo(text.trim(), {
      onDuplicate: () => {
        setError({ type: 'validation', message: '同じタスクが既に存在します。' })
        setTimeout(() => setError(null), 2500)
      }
    })
    setText('')
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAdd()
    }
  }

  return (
    <div className={styles.inputRow}>
      <input
        className={styles.input}
        placeholder="タスクを入力..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        aria-label="todo text"
      />
      <button className={styles.addBtn} onClick={handleAdd} aria-label="add todo">追加</button>
      <div className={styles.error} aria-live="polite">
        {error?.message}
      </div>
    </div>
  )
}
