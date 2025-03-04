import { Routes, Route } from 'react-router-dom'
import CSVUploader from './components/CSVUploader'
import CSVConverter from './components/CSVConverter.tsx'
import NavigationButton from './components/NavigationButton.tsx'

function App() {
  return (
    <>
      <NavigationButton />
      <Routes>
        <Route path='/' element={<CSVUploader />} />
        <Route path='/analyse' element={<CSVConverter />} />
      </Routes>
    </>
  )
}

export default App
