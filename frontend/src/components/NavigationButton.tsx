import { GoHistory } from 'react-icons/go'
import { IoCloudUploadOutline } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'

function NavigationButton() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className='navigationButton'>
      <Link to={isHomePage ? '/analyse' : '/'}>
        <button>
          {isHomePage ? (
            <span>
              <GoHistory size={15} />
              Afficher l'historique
            </span>
          ) : (
            <span>
              <IoCloudUploadOutline size={15} />
              Télécharger un autre fichier
            </span>
          )}
        </button>
      </Link>
    </div>
  )
}

export default NavigationButton
