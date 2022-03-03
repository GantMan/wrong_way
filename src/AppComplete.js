import { useEffect, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import { CLASSES } from './labels'
import './App.css'
import { AILabLocalVideo } from 'ai-lab'

const wrongSide = 0.5

function App() {
  const [model, setModel] = useState(null)
  const [totalPeople, setTotalPeople] = useState(0)
  const [dangerPeople, setDangerPeople] = useState(0)

  function checkResults(results, details) {
    if (!results) return
    setTotalPeople(results.length)

    const badSpots = details.detections.flatMap((d) =>
      details.boxes[d][3] > wrongSide ? true : []
    )
    setDangerPeople(badSpots.length)
  }

  useEffect(() => {
    tf.loadGraphModel(
      'https://storage.googleapis.com/tfhub-tfjs-modules/tensorflow/tfjs-model/ssd_mobilenet_v2/1/default/1/model.json'
    ).then((loadedModel) => setModel(loadedModel))
  }, [])

  const currentStyle = dangerPeople > 0 ? { backgroundColor: 'red' } : {}
  return (
    <div className="App">
      <header className="App-header" style={currentStyle}>
        <h1>AI-Lab</h1>
        <p>
          Out of {totalPeople} - {dangerPeople} are on the wrong side
        </p>
        <div className="divider"></div>
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
            src={'/girl.mov'}
          />
        )}
      </header>
    </div>
  )
}

export default App
