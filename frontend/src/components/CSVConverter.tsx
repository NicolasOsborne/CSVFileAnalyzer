import { useState } from 'react'
import HistoryFileCard from './HistoryFileCard'
import { IoIosArrowBack } from 'react-icons/io'

type CSVAnalysis = {
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
  ID: string
  Name: string
  Price: string
  Quantity: string
  Score: string
}

type CSVHistoryItem = {
  name: string
  content: CSVAnalysis
}

function CSVConverter() {
  const [CSVFile, setCSVFile] = useState<File | null>(null)
  const [historiqueCSV, setHistoriqueCSV] = useState<CSVHistoryItem[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [detailAnalyse, setDetailAnalyse] = useState<CSVHistoryItem | null>(
    null
  )
  // const [jsonData, setJsonData] = useState(null)
  // const [csvOutput, setCsvOutput] = useState<object | null>({
  //   headers: [],
  //   rows: [],
  // })

  const fetchData = async () => {
    try {
      const response = await fetch('/dataAnalyse.json')
      if (!response.ok) {
        throw new Error('Erreur lors du chargement du fichier')
      }
      return await response.json()
    } catch (error) {
      console.error('Erreur lors du chargement du JSON :', error)
      return null
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCSVFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (CSVFile) {
      const fileName = CSVFile ? CSVFile.name.split('\\') : []
      const CSVOutput = await fetchData()

      console.log(CSVOutput)

      setHistoriqueCSV((prev) => {
        if (prev.some((item) => item.name === fileName[fileName.length - 1])) {
          console.log('icic')
          return prev
        }
        console.log({ name: fileName[fileName.length - 1], content: CSVOutput })
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
    console.log(analyse)
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
                          <th scope={'col'}></th>
                          <th scope={'col'}>Mean</th>
                          <th scope={'col'}>Median</th>
                          <th scope={'col'}>Standard Deviation</th>
                        </tr>
                      </thead>
                      {detailAnalyse && (
                        <tbody>
                          <tr>
                            <th scope={'row'}>Price</th>
                            <td>{detailAnalyse.content.analysis.price.mean}</td>
                            <td>
                              {detailAnalyse.content.analysis.price.median}
                            </td>
                            <td>
                              {
                                detailAnalyse.content.analysis.price
                                  .standardDeviation
                              }
                            </td>
                          </tr>
                          <tr>
                            <th scope={'row'}>Quantity</th>
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
                            <th scope={'row'}>Score</th>
                            <td>{detailAnalyse.content.analysis.score.mean}</td>
                            <td>
                              {detailAnalyse.content.analysis.score.median}
                            </td>
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
                        {Object.values(
                          detailAnalyse?.content['errors'] ?? {}
                        ).map((error: Product & { errorType?: string }) => (
                          <tr key={error.ID}>
                            <td>{error.ID}</td>
                            <td>{error.Name}</td>
                            <td>{error.Price}</td>
                            <td>{error.Quantity}</td>
                            <td>{error.Score}</td>
                            <td className='error'>{error.errorType}</td>
                          </tr>
                        ))}
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
                          <tr key={product.ID}>
                            <td>{product.ID}</td>
                            <td>{product.Name}</td>
                            <td>{product.Price}</td>
                            <td>{product.Quantity}</td>
                            <td>{product.Score}</td>
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
