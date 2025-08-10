export default function App() {
  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
      padding: '2rem',
      lineHeight: 1.6
    }}>
      <h1>React + Firebase App Hosting</h1>
      <p>このプロジェクトは Vite + React と Express サーバで構成され、Firebase App Hosting を前提にしています。</p>
      <ul>
        <li>開発: <code>npm run dev</code>（Vite）</li>
        <li>ビルド: <code>npm run build</code></li>
        <li>実行: <code>npm start</code>（dist を Express で配信）</li>
      </ul>
    </div>
  )
}
