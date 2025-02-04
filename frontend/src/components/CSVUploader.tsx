import { useState } from 'react'
import { GoInfo, GoPlusCircle } from 'react-icons/go'

function CSVUploader() {
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
    <section className='csvUploader'>
      <h1 className='csvUploader_title'>CSV Uploader</h1>
      <form className='csvUploader_form'>
        <label className='csvUploader_label' htmlFor='csvUploader_input'>
          <GoPlusCircle size={42} />
          <p className='csvUploader_label-text'>
            Déposez ou cliquez pour choisir un fichier à uploader
          </p>
          <span className='csvUploader_label-helper'>
            <GoInfo size={20} />
            Type de fichier accepté : .csv
          </span>
          {/* <input
            className='csvUploader_input'
            type={'file'}
            id={'csvFileInput'}
            accept={'.csv'}
            onChange={handleChange}
          />
          <button
            className='csvUploader_submit'
            onClick={(e) => {
              handleSubmit(e)
            }}
          >
            IMPORT CSV
          </button> */}
        </label>
      </form>
    </section>
  )
}

export default CSVUploader
