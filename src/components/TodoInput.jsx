// 新規タスクの入力と検証を担当するコンポーネント
import React, { useState } from 'react'
import styles from '../styles/TodoApp.module.css'

export default function TodoInput({ onAddTodo }) {
  const [text, setText] = useState('')
  const [error, setError] = useState(null)

  // 入力検証（空文字と200文字超をブロック）
  const validate = (value) => {
    const v = value.trim()
    if (!v) return { type: 'validation', message: 'タスクを入力してください。' }
    if (v.length > 200) return { type: 'validation', message: '200文字以内で入力してください。' }
    return null
  }

  // 追加ボタン押下（または Enter）時の処理
  const handleAdd = () => {
    const err = validate(text)
    if (err) {
      setError(err)
  // メッセージの自動消去
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

  // Enter で追加（フォーム送信を抑止）
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
