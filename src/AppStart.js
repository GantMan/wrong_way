import { useEffect, useState } from 'react'
import './App.css'
// import * as tf from '@tensorflow/tfjs'
// import { AILabLocalVideo } from 'ai-lab'

function App() {
  const [model, setModel] = useState(null)

  function checkResults(results, details) {
    if (!results) return
    console.log('Check Results Run')
  }

  useEffect(() => {
    // Load model here https://tfhub.dev/
  }, [])

  const currentStyle = false ? { backgroundColor: 'red' } : {}
  return (
    <div className="App">
      <header className="App-header" style={currentStyle}>
        <h1>AI-Lab</h1>
        <p>Detect a person (security cam)</p>

        {!model && <p>loading...</p>}
        {model && <p>Let's GOOOOO</p>}
      </header>
    </div>
  )
}

export default App
