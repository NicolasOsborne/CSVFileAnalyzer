import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavigationButton from './components/NavigationButton.tsx'
import CSVUploader from './components/CSVUploader'
import CSVConverter, { CSVAnalysis } from './components/CSVConverter.tsx'

function App() {
  const [analysisResult, setAnalysisResult] = useState<CSVAnalysis | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  return (
    <>
      <NavigationButton />
      <Routes>
        <Route
          path='/'
          element={
            <CSVUploader
              setAnalysisResult={setAnalysisResult}
              setFileName={setFileName}
            />
          }
        />
        <Route
          path='/analyse'
          element={
            <CSVConverter analysisResult={analysisResult} fileName={fileName} />
          }
        />
      </Routes>
    </>
  )
}

export default App
