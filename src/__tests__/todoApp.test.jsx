import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import TodoApp from '../components/TodoApp'

function setup() {
  render(<TodoApp />)
  const input = screen.getByLabelText('todo text')
  const addBtn = screen.getByRole('button', { name: 'add todo' })
  return { input, addBtn, user: userEvent.setup() }
}

describe('Todo CRUD Operations (useImmer)', () => {
  test('adds new todo', async () => {
    const { input, addBtn, user } = setup()
    await user.type(input, 'Task A')
    await user.click(addBtn)
    expect(screen.getByText('Task A')).toBeInTheDocument()
  })

  test('prevents empty input', async () => {
    const { addBtn, user } = setup()
    await user.click(addBtn)
    expect(await screen.findByText('タスクを入力してください。')).toBeInTheDocument()
  })

  test('toggles todo done', async () => {
    const { input, addBtn, user } = setup()
    await user.type(input, 'Task B')
    await user.click(addBtn)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  test('deletes a todo', async () => {
    const { input, addBtn, user } = setup()
    await user.type(input, 'Task C')
    await user.click(addBtn)
    const delBtn = screen.getByRole('button', { name: /削除/ })
    await user.click(delBtn)
    expect(screen.queryByText('Task C')).not.toBeInTheDocument()
  })
})
