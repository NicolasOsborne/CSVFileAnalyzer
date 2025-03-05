import { useEffect, useState } from 'react'
import HistoryFileCard from './HistoryFileCard'
import { IoIosArrowBack } from 'react-icons/io'

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
  mean: string
  median: string
  standardDeviation: string
}

type Product = {
  id: string
  name: string
  price: string
  quantity: string
  score: string
}

type CSVHistoryItem = {
  name: string
  content: CSVAnalysis
}

type CSVConverterProps = {
  analysisResult: CSVAnalysis | null
  fileName: string | null
}

function CSVConverter({ analysisResult, fileName }: CSVConverterProps) {
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
    }
  }, [analysisResult, fileName])

  const showHistoriqueCSV = (analyse: CSVHistoryItem) => {
    setShow(true)
    setDetailAnalyse(analyse)
  }

  return (
    <section className='csvConverter'>
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
                          <td>{detailAnalyse.content.analysis.price.mean}</td>
                          <td>{detailAnalyse.content.analysis.price.median}</td>
                          <td>
                            {
                              detailAnalyse.content.analysis.price
                                .standardDeviation
                            }
                          </td>
                        </tr>
                        <tr>
                          <th scope={'row'}>Quantité</th>
                          <td>
                            {detailAnalyse.content.analysis.quantity.mean}
                          </td>
                          <td>
                            {detailAnalyse.content.analysis.quantity.median}
                          </td>
                          <td>
                            {
                              detailAnalyse.content.analysis.quantity
                                .standardDeviation
                            }
                          </td>
                        </tr>
                        <tr>
                          <th scope={'row'}>Notes</th>
                          <td>{detailAnalyse.content.analysis.score.mean}</td>
                          <td>{detailAnalyse.content.analysis.score.median}</td>
                          <td>
                            {
                              detailAnalyse.content.analysis.score
                                .standardDeviation
                            }
                          </td>
                        </tr>
                      </tbody>
                    )}
                  </table>
                </div>
                <div className='csvConverter_details-section'>
                  <h3 className='csvConverter_details-section-title'>
                    Produits en Erreur
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
                            <td>{error.id}</td>
                            <td>{error.name}</td>
                            <td>{error.price}</td>
                            <td>{error.quantity}</td>
                            <td>{error.score}</td>
                            <td className='error'>{error.errorType}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className='no-errors'>
                            ✅ Le fichier ne contient pas d'erreurs
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className='csvConverter_details-section'>
                  <h3 className='csvConverter_details-section-title'>
                    Produits Valides
                  </h3>
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Prix</th>
                        <th>Quantité</th>
                        <th>Note Client</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.values(
                        detailAnalyse?.content['products'] ?? {}
                      ).map((product: Product) => (
                        <tr key={product.id}>
                          <td>{product.id}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.quantity}</td>
                          <td>{product.score}</td>
                        </tr>
                      ))}
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
                      ? 'ERREUR'
                      : 'OK',
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
