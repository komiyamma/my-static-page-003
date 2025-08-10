import express from 'express'
import compression from 'compression'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '..')
const distDir = path.join(root, 'dist')

const app = express()
const port = process.env.PORT || 8080

app.use(compression())
app.use(express.static(distDir, { extensions: ['html'] }))

// Health check (for container platforms)
app.get(['/healthz', '/_health', '/_ah/health'], (_req, res) => {
  res.status(200).send('ok')
})

// SPA fallback
app.get('*', (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
