# 設計書

## 概要

useImmerライブラリを活用したTodoリストアプリケーションの技術設計書です。Reactの関数コンポーネントとuseImmerフックを使用して、効率的で保守性の高い状態管理を実現します。

## アーキテクチャ

### 技術スタック

- **フロントエンド**: React 19 (関数コンポーネント + Hooks)
- **状態管理**: useImmer (use-immer パッケージ)
- **言語**: JavaScript (ES2023)
- **スタイリング**: CSS Modules または Styled Components
- **ビルドツール**: Vite または Create React App

### アプリケーション構造

```
src/
├── components/
│   ├── TodoApp.jsx          # メインアプリケーションコンポーネント
│   ├── TodoList.jsx         # タスクリスト表示コンポーネント
│   ├── TodoItem.jsx         # 個別タスクコンポーネント
│   └── TodoInput.jsx        # タスク入力コンポーネント
├── utils/
│   └── todoTypes.js         # データ型の定義とバリデーション
├── hooks/
│   └── useTodos.js          # カスタムフック（オプション）
└── styles/
    └── TodoApp.module.css   # スタイル定義
```

## コンポーネントとインターフェース

### データモデル

```javascript
/**
 * Todo オブジェクトの構造
 * @typedef {Object} Todo
 * @property {string} id - 一意識別子 (UUID v4)
 * @property {string} text - タスクのテキスト内容
 * @property {boolean} done - 完了状態フラグ
 * @property {Date} createdAt - 作成日時
 */

/**
 * アプリケーション状態の構造
 * @typedef {Object} TodoState
 * @property {Todo[]} todos - Todoオブジェクトの配列
 */
```

### コンポーネント設計

#### 1. TodoApp (メインコンポーネント)

**責務**: 
- アプリケーション全体の状態管理
- useImmerを使用したCRUD操作の実装
- 子コンポーネントへのprops配布

**主要な状態とメソッド**:
```javascript
const [todos, updateTodos] = useImmer([]);

// CRUD操作メソッド
const addTodo = (text) => { /* 実装 */ };
const deleteTodo = (id) => { /* 実装 */ };
const toggleTodo = (id) => { /* 実装 */ };
```

#### 2. TodoInput (入力コンポーネント)

**責務**:
- 新しいタスクのテキスト入力
- 入力値の検証
- 追加ボタンの制御

**Props**:
```javascript
/**
 * @typedef {Object} TodoInputProps
 * @property {function(string): void} onAddTodo - タスク追加コールバック
 */
```

#### 3. TodoList (リストコンポーネント)

**責務**:
- タスクリストの表示
- 空状態の処理
- TodoItemコンポーネントの管理

**Props**:
```javascript
/**
 * @typedef {Object} TodoListProps
 * @property {Todo[]} todos - Todoオブジェクトの配列
 * @property {function(string): void} onToggleTodo - タスク完了状態切り替えコールバック
 * @property {function(string): void} onDeleteTodo - タスク削除コールバック
 */
```

#### 4. TodoItem (個別タスクコンポーネント)

**責務**:
- 個別タスクの表示
- チェックボックスと削除ボタンの制御
- 完了状態に応じたスタイリング

**Props**:
```javascript
/**
 * @typedef {Object} TodoItemProps
 * @property {Todo} todo - Todoオブジェクト
 * @property {function(string): void} onToggle - 完了状態切り替えコールバック
 * @property {function(string): void} onDelete - 削除コールバック
 */
```

## データモデル

### Todo オブジェクト構造

```javascript
/**
 * Todo オブジェクトの構造
 * @typedef {Object} Todo
 * @property {string} id - 一意識別子 (UUID v4)
 * @property {string} text - タスクのテキスト内容
 * @property {boolean} done - 完了状態フラグ
 * @property {Date} createdAt - 作成日時
 */
```

### 状態管理パターン

useImmerを使用した状態更新パターン:

```javascript
// 追加操作
const addTodo = useCallback((text) => {
  updateTodos(draft => {
    draft.push({
      id: crypto.randomUUID(),
      text: text.trim(),
      done: false,
      createdAt: new Date()
    });
  });
}, [updateTodos]);

// 削除操作
const deleteTodo = useCallback((id) => {
  updateTodos(draft => {
    const index = draft.findIndex(todo => todo.id === id);
    if (index !== -1) {
      draft.splice(index, 1);
    }
  });
}, [updateTodos]);

// 更新操作
const toggleTodo = useCallback((id) => {
  updateTodos(draft => {
    const todo = draft.find(todo => todo.id === id);
    if (todo) {
      todo.done = !todo.done;
    }
  });
}, [updateTodos]);
```

## エラーハンドリング

### 入力検証

1. **空文字チェック**: タスクテキストが空または空白のみの場合は追加を拒否
2. **文字数制限**: タスクテキストの最大文字数制限（例：200文字）
3. **重複チェック**: 同一テキストのタスクの重複追加防止（オプション）

### エラー表示

```javascript
/**
 * エラー状態の構造
 * @typedef {Object} ErrorState
 * @property {string} message - エラーメッセージ
 * @property {'validation'|'system'} type - エラーの種類
 */
```

エラーメッセージの表示方法:
- 入力フィールド下部にインライン表示
- 一定時間後の自動消去
- アクセシビリティ対応（aria-live属性）

## テスト戦略

### 単体テスト

**テスト対象**:
1. useImmerによる状態更新ロジック
2. 各コンポーネントの描画とイベントハンドリング
3. 入力検証ロジック

**テストツール**:
- Jest + React Testing Library
- @testing-library/user-event

**主要テストケース**:
```javascript
describe('Todo CRUD Operations', () => {
  test('should add new todo with useImmer', () => {});
  test('should delete todo by id with useImmer', () => {});
  test('should toggle todo completion with useImmer', () => {});
  test('should handle empty input validation', () => {});
});
```

### 統合テスト

**テストシナリオ**:
1. タスクの追加から削除までの完全なフロー
2. 複数タスクの状態変更の相互作用
3. エラー状態からの回復

### パフォーマンステスト

**測定項目**:
1. 大量タスク（1000件以上）での操作レスポンス
2. useImmerによる再レンダリング最適化の効果
3. メモリ使用量の監視

## 実装上の考慮事項

### useImmer最適化

1. **useCallback使用**: イベントハンドラーのメモ化
2. **React.memo**: 子コンポーネントの不要な再レンダリング防止
3. **キー属性**: リスト項目の効率的な更新

### アクセシビリティ

1. **キーボードナビゲーション**: Tab、Enter、Spaceキーでの操作
2. **スクリーンリーダー対応**: 適切なaria属性の設定
3. **フォーカス管理**: 削除後の適切なフォーカス移動

### レスポンシブデザイン

1. **モバイルファースト**: タッチデバイスでの操作性
2. **ブレークポイント**: デスクトップとモバイルの最適化
3. **タッチターゲット**: 最小44px×44pxのタップ領域確保

## セキュリティ考慮事項

### XSS対策

1. **入力サニタイゼーション**: HTMLタグの無効化
2. **CSP設定**: Content Security Policyの適用
3. **出力エスケープ**: Reactの自動エスケープ機能活用

### データ保護

1. **ローカルストレージ**: 機密情報の保存回避
2. **入力制限**: 悪意のある大量データ投入の防止