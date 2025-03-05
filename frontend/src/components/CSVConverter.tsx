import { useEffect, useState } from 'react'
import HistoryFileCard from './HistoryFileCard'
import { IoIosArrowBack } from 'react-icons/io'
import { toast } from 'react-toastify'
import Spinner from './Spinner'

import emailjs from '@emailjs/browser'
import { IoMailUnreadOutline } from 'react-icons/io5'

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

  const sendByEmail = () => {
    if (!detailAnalyse) return

    const analysisBody = `
      <h3 style="color: #aa65d3">Analyse des Données CSV: ${
        detailAnalyse.name
      }</h3>
      <h4 style="color: #aa65d3">Analyse des Statistiques</h4>
      <table style="width: 100%; border-collapse: collapse; border: 1px solid #696969; text-align: center;">
        <thead>
          <tr style="background-color: #e3c1f7">
            <th style="padding: 0.5rem; border: 1px solid #696969;">Type</th>
            <th style="padding: 0.5rem; border: 1px solid #696969;">Moyenne</th>
            <th style="padding: 0.5rem; border: 1px solid #696969;">Médiane</th>
            <th style="padding: 0.5rem; border: 1px solid #696969;">Écart-type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 0.5rem; border: 1px solid #696969; background-color: #e3c1f7">Prix</td>
            <td style="padding: 0.5rem; border: 1px solid #696969;">${detailAnalyse.content.analysis.price.mean.toFixed(
              2
            )}</td>
            <td style="padding: 0.5rem; border: 1px solid #696969;">${detailAnalyse.content.analysis.price.median.toFixed(
              2
            )}</td>
            <td style="padding: 0.5rem; border: 1px solid #696969;">${detailAnalyse.content.analysis.price.standardDeviation.toFixed(
              2
            )}</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border: 1px solid #696969; background-color: #e3c1f7">Quantité</td>
            <td style="padding: 0.5rem; border: 1px solid #696969;">${detailAnalyse.content.analysis.quantity.mean.toFixed(
              2
            )}</td>
            <td style="padding: 0.5rem; border: 1px solid #696969;">${detailAnalyse.content.analysis.quantity.median.toFixed(
              2
            )}</td>
            <td style="padding: 0.5rem; border: 1px solid #696969;">${detailAnalyse.content.analysis.quantity.standardDeviation.toFixed(
              2
            )}</td>
          </tr>
          <tr>
            <td style="padding: 0.5rem; border: 1px solid #696969; background-color: #e3c1f7">Notes</td>
            <td style="padding: 0.5rem; border: 1px solid #696969;">${detailAnalyse.content.analysis.score.mean.toFixed(
              2
            )}</td>
            <td style="padding: 0.5rem; border: 1px solid #696969;">${detailAnalyse.content.analysis.score.median.toFixed(
              2
            )}</td>
            <td style="padding: 0.5rem; border: 1px solid #696969;">${detailAnalyse.content.analysis.score.standardDeviation.toFixed(
              2
            )}</td>
          </tr>
        </tbody>
      </table>
      <h4 style="color: #aa65d3">Produits avec Erreurs</h4>
      ${
        Object.keys(detailAnalyse.content.errors).length > 0
          ? `
        <table style="width: 100%; border-collapse: collapse; border: 1px solid #696969; text-align: center;">
          <thead>
            <tr style="background-color: #e3c1f7">
              <th style="padding: 0.5rem; border: 1px solid #696969;">ID</th>
              <th style="padding: 0.5rem; border: 1px solid #696969;">Nom</th>
              <th style="padding: 0.5rem; border: 1px solid #696969;">Prix</th>
              <th style="padding: 0.5rem; border: 1px solid #696969;">Quantité</th>
              <th style="padding: 0.5rem; border: 1px solid #696969;">Note Client</th>
              <th style="padding: 0.5rem; border: 1px solid #696969;">Erreur</th>
            </tr>
          </thead>
          <tbody>
            ${Object.values(detailAnalyse.content.errors)
              .map(
                (error: Product & { errorType?: string }) => `
                <tr>
                  <td style="padding: 0.5rem; border: 1px solid #696969;">${error.id}</td>
                  <td style="padding: 0.5rem; border: 1px solid #696969;">${error.name}</td>
                  <td style="padding: 0.5rem; border: 1px solid #696969;">${error.price}</td>
                  <td style="padding: 0.5rem; border: 1px solid #696969;">${error.quantity}</td>
                  <td style="padding: 0.5rem; border: 1px solid #696969;">${error.score}</td>
                  <td style="padding: 0.5rem; border: 1px solid #696969; color: #ed4337; background-color: #fcd3d3">${error.errorType}</td>
                </tr>`
              )
              .join('')}
          </tbody>
        </table>
      `
          : '<p style="color: #49ac49; font-weight: 600">✅ Aucun produit en erreur !</p>'
      }
    `

    emailjs
      .send(
        import.meta.env.VITE_REACT_APP_EMAILJS_SERVICE_KEY,
        import.meta.env.VITE_REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          file_name: detailAnalyse.name,
          message: analysisBody,
        },
        import.meta.env.VITE_REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        toast.success('Email récapitulatif envoyé avec succès !')
      })
      .catch(() => {
        toast.error(
          "Une erreur est survenue lors de l'envoi de l'email. Veuillez réessayer."
        )
      })
  }

  return (
    <section className='csvConverter'>
      {loading && <Spinner />}
      {historiqueCSV.length > 0 && show ? (
        <>
          <h1 className='csvConverter_title'>Détails de l'analyse</h1>
          <div className='csvConverter_details'>
            <div className='csvConverter_details-buttons'>
              <button
                className='csvConverter_details-backToHistory'
                onClick={() => setShow(false)}
              >
                <IoIosArrowBack />
                Retour à l'historique
              </button>
              <button
                className='csvConverter_details-sendByEmail'
                onClick={sendByEmail}
              >
                <IoMailUnreadOutline />
                Recevoir le récapitulatif par email
              </button>
            </div>
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
