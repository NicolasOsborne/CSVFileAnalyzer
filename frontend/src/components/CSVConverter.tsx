import { useState } from 'react'

function CSVConverter() {
  const [CSVFile, setCSVFile] = useState()

  const fileReader = new FileReader()

  const handleChange = (e) => {
    setCSVFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (CSVFile) {
      fileReader.onload = function (event) {
        const CSVOutput = event.target.result
        console.log(CSVOutput)
      }

      fileReader.readAsText(CSVFile)
    }
  }

  return (
    <div>
      <form>
        <input
          type={'file'}
          id={'csvFileInput'}
          accept={'.csv'}
          onChange={handleChange}
        />
        <button
          onClick={(e) => {
            handleSubmit(e)
          }}
        >
          IMPORT CSV
        </button>
      </form>
    </div>
  )
}

export default CSVConverter
