import { useState } from 'react'
import HistoryFileCard from './HistoryFileCard'
import { IoIosArrowBack } from 'react-icons/io'

type CSVAnalysis = {
  analysis: {
    mean: string
    median: string
    'standard-deviation': string
    'global-quantity': string
    'mean-score': string
  }
  'list-product': Record<string, Product>
  'list-error': Record<string, Product & { error?: string }>
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

function CSVConverter() {
  const [CSVFile, setCSVFile] = useState<File | null>(null)
  const [csvOutput, setCsvOutput] = useState<object | null>({
    headers: [],
    rows: [],
  })
  const [historiqueCSV, setHistoriqueCSV] = useState<CSVHistoryItem[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [detailAnalyse, setDetailAnalyse] = useState<CSVHistoryItem | null>(
    null
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCSVFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (CSVFile) {
      const fileName = CSVFile ? CSVFile.name.split('\\') : []
      const CSVOutput = {
        analysis: {
          mean: '',
          median: 'This is a median',
          'standard-deviation': '',
          'global-quantity': '',
          'mean-score': '',
        },
        'list-product': {
          product1: {
            id: '1',
            name: 'Nom du Produit 1',
            price: '230',
            quantity: '3',
            score: '2.19',
          },
          product2: {
            id: '2',
            name: 'Nom du Produit 2',
            price: '45',
            quantity: '6',
            score: '55.9',
          },
        },
        'list-error': {
          product1: {
            id: '1',
            name: 'Produit 3',
            price: '55',
            quantity: '1',
            score: '22.9',
            error: 'BAD name',
          },
          product2: {
            id: '2',
            name: 'Produit 2',
            price: '660',
            quantity: '3',
            score: '33.5',
            error: 'BAD name',
          },
        },
      }

      console.log(CSVOutput)

      setHistoriqueCSV((prev) => {
        if (prev.some((item) => item.name === fileName[fileName.length - 1])) {
          console.log('icic')
          return prev
        }
        return [
          ...prev,
          { name: fileName[fileName.length - 1], content: CSVOutput },
        ]
      })
    }
  }

  const showHistoriqueCSV = (analyse: CSVHistoryItem) => {
    setShow(true)
    setDetailAnalyse(analyse)
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
                          <th>Mean</th>
                          <th>Median</th>
                          <th>Standard Deviation</th>
                          <th>Global Quantity</th>
                          <th>Mean Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {detailAnalyse && (
                          <tr>
                            <td>{detailAnalyse.content.analysis.mean}</td>
                            <td>{detailAnalyse.content.analysis.median}</td>
                            <td>
                              {
                                detailAnalyse.content.analysis[
                                  'standard-deviation'
                                ]
                              }
                            </td>
                            <td>
                              {
                                detailAnalyse.content.analysis[
                                  'global-quantity'
                                ]
                              }
                            </td>
                            <td>
                              {detailAnalyse.content.analysis['mean-score']}
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
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.values(
                          detailAnalyse?.content['list-product'] || {}
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
                          <th>Score</th>
                          <th>Erreur</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.values(
                          detailAnalyse?.content['list-error'] || {}
                        ).map((error: Product & { error?: string }) => (
                          <tr key={error.id}>
                            <td>{error.id}</td>
                            <td>{error.name}</td>
                            <td>{error.price}</td>
                            <td>{error.quantity}</td>
                            <td>{error.score}</td>
                            <td style={{ color: 'red' }}>{error.error}</td>
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
            <h1 className='csvUploader_title'>
              Historique des téléchargements
            </h1>
            <div className='csvConverter_historyContainer'>
              {historiqueCSV.map((file, index) => (
                <HistoryFileCard
                  key={index}
                  CSVFile={{ name: file.name, status: 'OK' }}
                  seeDetails={() => showHistoriqueCSV(file)}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  )
}

export default CSVConverter
