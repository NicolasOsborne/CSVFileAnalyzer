interface CSVFileAnalysisProps {
  detailAnnalyse: any
  onBack: () => void
}

const CSVFileAnalysis: React.FC<CSVFileAnalysisProps> = ({
  detailAnnalyse,
  onBack,
}) => {
  return (
    <div className='csvConverter_details'>
      <button className='csvConverter_details-backToHistory' onClick={onBack}>
        Retour Historique
      </button>
      <div className='csvConverter_details-info'>
        <h2 className='csvConverter_details-name'>{detailAnnalyse.name}</h2>

        {/* Analysis Table */}
        <div className='csvConverter_details-section'>
          <h3 className='csvConverter_details-section-title'>Analyse</h3>
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
              <tr>
                <td>{detailAnnalyse.content.analysis.mean}</td>
                <td>{detailAnnalyse.content.analysis.median}</td>
                <td>{detailAnnalyse.content.analysis['standard-deviation']}</td>
                <td>{detailAnnalyse.content.analysis['global-quantity']}</td>
                <td>{detailAnnalyse.content.analysis['mean-score']}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Valid Products Table */}
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
              {Object.values(detailAnnalyse.content['list-product']).map(
                (product: any, idx) => (
                  <tr key={idx}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.score}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Error Products Table */}
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
              {Object.values(detailAnnalyse.content['list-error']).map(
                (error: any, idx) => (
                  <tr key={idx}>
                    <td>{error.id}</td>
                    <td>{error.name}</td>
                    <td>{error.price}</td>
                    <td>{error.quantity}</td>
                    <td>{error.score}</td>
                    <td style={{ color: 'red' }}>{error.error}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CSVFileAnalysis
