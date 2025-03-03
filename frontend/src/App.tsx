import { Routes, Route } from "react-router-dom";
import CSVUploader from './components/CSVUploader'
import CSVConverter from "./components/CSVConverter.tsx";

function App() {
  return (
      <Routes>
          <Route path="/" element={<CSVUploader />} />
          <Route path="/analyse" element={<CSVConverter />} />
      </Routes>
  )
}

export default App
