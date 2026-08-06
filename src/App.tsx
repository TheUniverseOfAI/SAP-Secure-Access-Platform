import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>My Project</h1>
      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>count is {count}</button>
        <p>Standard React 19 + Vite + TypeScript scaffold.</p>
      </div>
    </>
  )
}

export default App
