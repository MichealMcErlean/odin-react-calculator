import { useState } from 'react'
import './App.css'
import Calculator from './components/Calculator'

function App() {

  return (
    <main>
      <header>
        <h1>Calculator</h1>
        <h2>An Odin Project exercise</h2>
        <h3>Powered by React</h3>
      </header>
      <article>
        <Calculator />
      </article>
      <footer>
        &copy; Micheal McErlean 2025.
      </footer>
    </main>
  )
}

export default App
