import { useState } from 'react'
import UploadedFileCard from './UploadedFileCard'
import { FiInfo, FiMinusCircle, FiPlusCircle } from 'react-icons/fi'

// import { uploadCSVFileToCloud } from '../api/api'

const CSVUploader = () => {
  const [CSVFile, setCSVFile] = useState<File | null>(null)
  const [wrongFileTypeError, setWrongFileTypeError] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileReader = new FileReader()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === 'text/csv') {
      setCSVFile(file)
      setIsDragging(false)
      setWrongFileTypeError(false)
    } else if (file && file.type !== 'text/csv') {
      setWrongFileTypeError(true)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && file.type === 'text/csv') {
      setCSVFile(file)
      setWrongFileTypeError(false)
    } else if (file && file.type !== 'text/csv') {
      setWrongFileTypeError(true)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDelete = () => {
    setCSVFile(null)
    setIsDragging(false)
  }

  const handleUpload = async () => {
    if (CSVFile) {
      // Code to update to upload file to the backend :

      // const formData = new FormData()
      // formData.append('file', CSVFile)
      // try {
      //   const response = await uploadCSVFileToCloud(formData)
      //   console.log('File uploaded successfully: ', response)
      // } catch (error) {
      //   console.error('Upload faled: ', error)
      // }

      // Remove this later (at the moment, displays the csv in the console) :
      fileReader.onload = function (event) {
        if (!event.target) return
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
        onDragLeave={handleDragLeave}
      >
        <label
          className={`csvUploader_label ${
            isDragging || CSVFile ? 'csvUploader_label--active' : ''
          }`}
          htmlFor='csvFileInput'
        >
          {CSVFile ? (
            <FiMinusCircle
              className='csvUploader_label-icon'
              size={42}
              onClick={handleDelete}
            />
          ) : (
            <FiPlusCircle
              className='csvUploader_label-icon'
              size={42}
              onClick={() =>
                (
                  document.getElementById('csvFileInput') as HTMLInputElement
                )?.click()
              }
            />
          )}
          <p className='csvUploader_label-text'>
            Déposez ou cliquez pour choisir un fichier à télécharger
          </p>
          <span className='csvUploader_label-helper'>
            <FiInfo size={20} />
            Type de fichier accepté : .csv
          </span>
          <input
            className='csvUploader_input'
            type='file'
            id='csvFileInput'
            accept='.csv'
            onChange={handleChange}
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
      {wrongFileTypeError && (
        <p className='csvUploader_error'>
          Cet outil n'accepte que les fichiers au format CSV !
        </p>
      )}
    </section>
  )
}

export default CSVUploader
