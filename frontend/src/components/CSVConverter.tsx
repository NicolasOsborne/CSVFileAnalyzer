import { useEffect, useState } from 'react'
import HistoryFileCard from './HistoryFileCard'
import { IoIosArrowBack } from 'react-icons/io'
import { toast } from 'react-toastify'
import Spinner from './Spinner'

export type CSVAnalysis = {
  analysis: {
    price: StatValues
    quantity: StatValues
    score: StatValues
  }
  products: Record<string, Product>
  errors: Record<string, Product & { errorType?: string }>
}

type StatValues = {
  mean: number
  median: number
  standardDeviation: number
}

type Product = {
  id: number
  name: string
  price: number
  quantity: number
  score: number
}

type CSVHistoryItem = {
  name: string
  content: CSVAnalysis
}

type CSVConverterProps = {
  analysisResult: CSVAnalysis | null
  fileName: string | null
  loading: boolean
}

function CSVConverter({
  analysisResult,
  fileName,
  loading,
}: CSVConverterProps) {
  const [historiqueCSV, setHistoriqueCSV] = useState<CSVHistoryItem[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [detailAnalyse, setDetailAnalyse] = useState<CSVHistoryItem | null>(
    null
  )

  useEffect(() => {
    const savedAnalysisHistory = localStorage.getItem('csvAnalysisHistory')
    if (savedAnalysisHistory) {
      setHistoriqueCSV(JSON.parse(savedAnalysisHistory))
    }
  }, [])

  useEffect(() => {
    if (analysisResult && fileName) {
      setHistoriqueCSV((prev) => [
        ...prev,
        { name: fileName, content: analysisResult },
      ])

      const errorCount = Object.keys(analysisResult.errors).length
      if (errorCount === 0) {
        toast.success(
          'Le fichier a bien été analysé, il ne comporte aucune erreur !'
        )
      } else {
        toast.error(
          `Le fichier a bien été analysé, il comporte ${errorCount} erreur(s). Veuillez consulter le récapitulatif pour plus d'informations !`
        )
      }
    }
  }, [analysisResult, fileName])

  const showHistoriqueCSV = (analyse: CSVHistoryItem) => {
    setShow(true)
    setDetailAnalyse(analyse)
  }

  return (
    <section className='csvConverter'>
      {loading && <Spinner />}
      {historiqueCSV.length > 0 && show ? (
        <>
          <h1 className='csvConverter_title'>Détails de l'analyse</h1>
          <div className='csvConverter_details'>
            <button
              className='csvConverter_details-backToHistory'
              onClick={() => setShow(false)}
            >
              <IoIosArrowBack />
              Retour à l'historique
            </button>
            {
              <div className='csvConverter_details-info'>
                {detailAnalyse && (
                  <h2 className='csvConverter_details-name'>
                    {Object.keys(detailAnalyse.content.errors).length > 0
                      ? '❌ '
                      : '✅ '}
                    {detailAnalyse.name}
                  </h2>
                )}
                <div className='csvConverter_details-section'>
                  <h3 className='csvConverter_details-section-title'>
                    Analyse
                  </h3>
                  <table>
                    <thead>
                      <tr>
                        <th scope={'col'}></th>
                        <th scope={'col'}>Moyenne</th>
                        <th scope={'col'}>Médiane</th>
                        <th scope={'col'}>Écart-type</th>
                      </tr>
                    </thead>
                    {detailAnalyse && (
                      <tbody>
                        <tr>
                          <th scope={'row'}>Prix</th>
                          <td>
                            {detailAnalyse.content.analysis.price.mean.toFixed(
                              2
                            )}
                          </td>
                          <td>
                            {detailAnalyse.content.analysis.price.median.toFixed(
                              2
                            )}
                          </td>
                          <td>
                            {detailAnalyse.content.analysis.price.standardDeviation.toFixed(
                              2
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th scope={'row'}>Quantité</th>
                          <td>
                            {detailAnalyse.content.analysis.quantity.mean.toFixed(
                              2
                            )}
                          </td>
                          <td>
                            {detailAnalyse.content.analysis.quantity.median.toFixed(
                              2
                            )}
                          </td>
                          <td>
                            {detailAnalyse.content.analysis.quantity.standardDeviation.toFixed(
                              2
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th scope={'row'}>Notes</th>
                          <td>
                            {detailAnalyse.content.analysis.score.mean.toFixed(
                              2
                            )}
                          </td>
                          <td>
                            {detailAnalyse.content.analysis.score.median.toFixed(
                              2
                            )}
                          </td>
                          <td>
                            {detailAnalyse.content.analysis.score.standardDeviation.toFixed(
                              2
                            )}
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
                <div className='csvConverter_details-section'>
                  <h3 className='csvConverter_details-section-title'>
                    Produits en Erreur{' '}
                    <span className='errors'>
                      {Object.keys(detailAnalyse?.content['errors'] ?? {})
                        .length > 0
                        ? `(${detailAnalyse?.content.errors.length} erreurs)`
                        : ''}
                    </span>
                  </h3>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Quantité</th>
                        <th>Note Client</th>
                        <th>Erreur</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(detailAnalyse?.content['errors'] ?? {})
                        .length > 0 ? (
                        Object.values(
                          detailAnalyse?.content['errors'] ?? {}
                        ).map((error: Product & { errorType?: string }) => (
                          <tr key={error.id}>
                            <td className={error.id === 0 ? 'error' : ''}>
                              {error.id}
                            </td>
                            <td className={error.name === '0' ? 'error' : ''}>
                              {error.name}
                            </td>
                            <td className={error.price === 0 ? 'error' : ''}>
                              {error.price}
                            </td>
                            <td className={error.quantity === 0 ? 'error' : ''}>
                              {error.quantity}
                            </td>
                            <td className={error.score === 0 ? 'error' : ''}>
                              {error.score}
                            </td>
                            <td className='error'>{error.errorType}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className='no-errors'>
                            ✅ Le fichier ne contient pas d'erreur
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            }
          </div>
        </>
      ) : (
        <>
          <h1 className='csvUploader_title'>Historique des téléchargements</h1>
          <div className='csvConverter_historyContainer'>
            {historiqueCSV.map((file, index) => (
              <HistoryFileCard
                key={index}
                CSVFile={{
                  name: file.name,
                  status:
                    Object.keys(file.content.errors).length > 0
                      ? `${file.content.errors.length} ERREURS`
                      : "PAS D'ERREUR",
                }}
                seeDetails={() => showHistoriqueCSV(file)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default CSVConverter
