import { GoTrash } from 'react-icons/go'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { MdFilePresent } from 'react-icons/md'
import { NavLink } from 'react-router-dom'

interface CSVFile {
  name: string
  type: string
  size: number
}

interface UploadedFileCardProps {
  CSVFile: CSVFile
  handleUpload: () => void
  handleDelete: () => void
}

const UploadedFileCard: React.FC<UploadedFileCardProps> = ({
  CSVFile,
  handleUpload,
  handleDelete,
}) => {
  return (
    <div className='uploadedFile'>
      <div className='uploadedFile_summary'>
        <MdFilePresent className='uploadedFile_icon' size={30} />
        <div className='uploadedFile_info'>
          <p className='uploadedFile_name'>{CSVFile.name}</p>
          <p className='uploadedFile_meta'>
            {CSVFile.type} | {(CSVFile.size / 1024).toFixed(2)} KB
          </p>
        </div>
      </div>
      <div className='uploadedFile_actions'>
        <NavLink to={'analyse'}>
          <button className='uploadedFile_button upload' onClick={handleUpload}>
            <IoCloudUploadOutline size={20} />
          </button>
        </NavLink>

        <button className='uploadedFile_button delete' onClick={handleDelete}>
          <GoTrash size={20} />
        </button>
      </div>
    </div>
  )
}

export default UploadedFileCard
