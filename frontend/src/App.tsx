import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavigationButton from './components/NavigationButton.tsx'
import CSVUploader from './components/CSVUploader'
import CSVConverter, { CSVAnalysis } from './components/CSVConverter.tsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [analysisResult, setAnalysisResult] = useState<CSVAnalysis | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
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
              setLoading={setLoading}
            />
          }
        />
        <Route
          path='/analyse'
          element={
            <CSVConverter
              analysisResult={analysisResult}
              fileName={fileName}
              loading={loading}
            />
          }
        />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
