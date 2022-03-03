import { useEffect, useState } from 'react'
import './App.css'
import * as tf from '@tensorflow/tfjs'
import { AILabLocalVideo } from 'ai-lab'

function App() {
  const [model, setModel] = useState(null)
  const [totalPeople, setTotalPeople] = useState(0)

  function checkResults(results, details) {
    if (!results) return
    setTotalPeople(results.length)
  }

  useEffect(() => {
    // Load model here https://tfhub.dev/
    tf.loadGraphModel(
      'https://storage.googleapis.com/tfhub-tfjs-modules/tensorflow/tfjs-model/ssd_mobilenet_v2/1/default/1/model.json'
    ).then((loadedModel) => setModel(loadedModel))
  }, [])

  const currentStyle = totalPeople > 0 ? { backgroundColor: 'red' } : {}
  return (
    <div className="App">
      <header className="App-header" style={currentStyle}>
        <h1>AI-Lab</h1>
        <p>Detect a person (security cam)</p>
        {!model && <p>loading...</p>}
        {model && (
          <AILabLocalVideo
            model={model}
            modelConfig={{
              modelType: 'ssd',
              nmsActive: true,
              threshold: 0.2,
            }}
            onInference={checkResults}
            filter={[0]} // only detect people
            visual
            perf="simple"
            src={'/airport.mov'}
          />
        )}
      </header>
    </div>
  )
}

export default App
