import { useEffect, useState } from 'react'
import * as tf from '@tensorflow/tfjs'
import { CLASSES } from './labels'
import './App.css'
import { AILabLocalVideo } from 'ai-lab'

function App() {
  const [model, setModel] = useState(null)

  useEffect(() => {
    tf.loadGraphModel(
      'https://storage.googleapis.com/tfhub-tfjs-modules/tensorflow/tfjs-model/ssd_mobilenet_v2/1/default/1/model.json'
    ).then((loadedModel) => setModel(loadedModel))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>AI Lab - Wrong Way Detector</h1>
        {!model && <p>loading...</p>}
        {model && (
          <AILabLocalVideo
            model={model}
            modelConfig={{
              modelType: 'ssd',
              labels: CLASSES,
              nmsActive: true,
            }}
            visual
            src={'/walkers.mov'}
          />
        )}
      </header>
    </div>
  )
}

export default App
