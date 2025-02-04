import { useState } from 'react'
import { GoInfo, GoPlusCircle, GoTrash } from 'react-icons/go'
import { IoCloudUploadOutline } from 'react-icons/io5'

function CSVUploader() {
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
        <div className='csvUploader_file-card'>
          <div className='csvUploader_file-info'>
            <span className='csvUploader_file-icon'>📄</span>
            <div>
              <p className='csvUploader_file-name'>{CSVFile.name}</p>
              <p className='csvUploader_file-meta'>
                {CSVFile.type} - {(CSVFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <div className='csvUploader_file-actions'>
            <button
              className='csvUploader_button upload'
              onClick={handleUpload}
            >
              <IoCloudUploadOutline size={20} />
            </button>
            <button
              className='csvUploader_button delete'
              onClick={handleDelete}
            >
              <GoTrash size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default CSVUploader
