import { useState } from 'react'
import { GoInfo, GoPlusCircle } from 'react-icons/go'
import UploadedFileCard from './UploadedFileCard'

const CSVUploader = () => {
  const [CSVFile, setCSVFile] = useState(null)
  const fileReader = new FileReader()

  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'text/csv') {
      setCSVFile(file)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type === 'text/csv') {
      setCSVFile(file)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDelete = () => {
    setCSVFile(null)
  }

  const handleUpload = () => {
    if (CSVFile) {
      fileReader.onload = function (event) {
        const CSVOutput = event.target.result
        console.log(CSVOutput)
      }

      fileReader.readAsText(CSVFile)
    }
  }

  return (
    <section className='csvUploader'>
      <h1 className='csvUploader_title'>CSV Uploader</h1>
      <form
        className='csvUploader_form'
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <label className='csvUploader_label' htmlFor='csvFileInput'>
          <GoPlusCircle
            size={42}
            onClick={() => document.getElementById('csvFileInput').click()}
          />
          <p className='csvUploader_label-text'>
            Déposez ou cliquez pour choisir un fichier à uploader
          </p>
          <span className='csvUploader_label-helper'>
            <GoInfo size={20} />
            Type de fichier accepté : .csv
          </span>
          <input
            className='csvUploader_input'
            type='file'
            id='csvFileInput'
            accept='.csv'
            onChange={handleChange}
            style={{ display: 'none' }}
          />
        </label>
      </form>
      {CSVFile && (
        <UploadedFileCard
          CSVFile={CSVFile}
          handleUpload={handleUpload}
          handleDelete={handleDelete}
        />
      )}
    </section>
  )
}

export default CSVUploader
