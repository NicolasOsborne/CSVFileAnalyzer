import { HiMiniMagnifyingGlassPlus } from 'react-icons/hi2'
import { MdFilePresent } from 'react-icons/md'

interface CSVFile {
  name: string
  status: string
}

interface HistoryFileCardProps {
  CSVFile: CSVFile
  seeDetails: () => void
}

const HistoryFileCard: React.FC<HistoryFileCardProps> = ({
  CSVFile,
  seeDetails,
}) => {
  return (
    <div
      className={`historyFile ${
        CSVFile.status === "PAS D'ERREUR" ? 'ok' : 'error'
      }`}
    >
      <div className='historyFile_summary'>
        <MdFilePresent className='historyFile_icon' size={30} />
        <div className='historyFile_info'>
          <p className='historyFile_name'>{CSVFile.name}</p>
          <p
            className={`historyFile_status ${
              CSVFile.status === "PAS D'ERREUR" ? 'ok' : 'error'
            }`}
          >
            {CSVFile.status}
          </p>
        </div>
      </div>
      <div className='historyFile_actions'>
        <button className='historyFile_button see-more' onClick={seeDetails}>
          <HiMiniMagnifyingGlassPlus size={20} />
        </button>
      </div>
    </div>
  )
}

export default HistoryFileCard
