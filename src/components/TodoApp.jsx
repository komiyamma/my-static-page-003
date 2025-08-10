// Todo アプリ本体。use-immer を用いて配列の不変更新を簡潔に記述します。
import React, { useCallback } from 'react'
import { useImmer } from 'use-immer'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import styles from '../styles/TodoApp.module.css'

export default function TodoApp() {
  // Todo の配列状態。updateTodos に draft 操作を渡すことで直感的に更新できます。
  const [todos, updateTodos] = useImmer([])

  // 追加: 空白以外のテキストを UUID 付きで配列末尾に追加（重複は onDuplicate で通知）
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

  // 削除: id で検索し、見つかった場合はその要素を削除
  const deleteTodo = useCallback((id) => {
    updateTodos((draft) => {
      const idx = draft.findIndex((t) => t.id === id)
      if (idx !== -1) draft.splice(idx, 1)
    })
  }, [updateTodos])

  // 完了切替: 対象の done フラグを反転
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
