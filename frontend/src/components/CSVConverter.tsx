import {useState} from 'react'
import HistoryFileCard from './HistoryFileCard'

function CSVConverter() {
  const [CSVFile, setCSVFile] = useState()
  const [csvOutput, setCsvOutput] = useState<object | null>({
    headers: [],
    rows: [],
  })
  const [historiqueCSV, setHistoriqueCSV] = useState<object[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [detailAnnalyse, setDetailAnnalyse] = useState<object>({})
  const [jsonData, setJsonData] = useState(null);

  const handleChange = (e) => {
    setCSVFile(e.target.files[0])
  }

  const fetchData = async () => {
    /*const essai = await fetch('/dataAnalyse.json');
    console.log(await essai.json());*/
    try {
      const response = await fetch("/dataAnalyse.json");
      if (!response.ok) {
        throw new Error("Erreur lors du chargement du fichier");
      }
      return await response.json();
    } catch (error) {
      console.error("Erreur lors du chargement du JSON :", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (CSVFile) {
      const fileName = CSVFile.name.split('\\')
      const CSVOutput = await fetchData();

      console.log(CSVOutput)

      setHistoriqueCSV((prev) => {
        if (prev.some((item) => item.name === fileName)) {
          console.log('icic')
          return prev
        }
        console.log({name: fileName[fileName.length - 1], content: CSVOutput})
        return [
          ...prev,
          {name: fileName[fileName.length - 1], content: CSVOutput},
        ]
      })
    }
  }

  const showHistoriqueCSV = (analyse) => {
    setShow(true)
    setDetailAnnalyse(analyse)
    console.log(analyse);
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
                Retour Historique
              </button>
              {
                <div className='csvConverter_details-info'>
                  <h2 className='csvConverter_details-name'>
                    {detailAnnalyse.name}
                  </h2>
                  <div className='csvConverter_details-section'>
                    <h3 className='csvConverter_details-section-title'>
                      Analyse
                    </h3>
                    <table
                      border='1'
                      style={{ width: '100%', textAlign: 'left' }}
                    >
                      <thead>
                        <tr>
                          <th scope={"col"}></th>
                          <th scope={"col"}>Mean</th>
                          <th scope={"col"}>Median</th>
                          <th scope={"col"}>Standard Deviation</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope={"row"}>Price</th>
                          <td>{detailAnnalyse.content.analysis.price.mean}</td>
                          <td>{detailAnnalyse.content.analysis.price.median}</td>
                          <td>{detailAnnalyse.content.analysis.price.standardDeviation}</td>
                        </tr>
                        <tr>
                          <th scope={"row"}>Quantity</th>
                          <td>{detailAnnalyse.content.analysis.quantity.mean}</td>
                          <td>{detailAnnalyse.content.analysis.quantity.median}</td>
                          <td>{detailAnnalyse.content.analysis.quantity.standardDeviation}</td>
                        </tr>
                        <tr>
                          <th scope={"row"}>Score</th>
                          <td>{detailAnnalyse.content.analysis.score.mean}</td>
                          <td>{detailAnnalyse.content.analysis.score.median}</td>
                          <td>{detailAnnalyse.content.analysis.score.standardDeviation}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className='csvConverter_details-section'>
                    <h3 className='csvConverter_details-section-title'>
                      Produits Valides
                    </h3>
                    <table
                      border='1'
                      style={{ width: '100%', textAlign: 'left' }}
                    >
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
                          detailAnnalyse.content['products']
                        ).map((product: any, idx) => (
                          <tr key={idx}>
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
                  <div className='csvConverter_details-section'>
                    <h3 className='csvConverter_details-section-title'>
                      Produits en Erreur
                    </h3>
                    <table
                      border='1'
                      style={{ width: '100%', textAlign: 'left' }}
                    >
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
                          detailAnnalyse.content['errors']
                        ).map((error: any, idx) => (
                          <tr key={idx}>
                            <td>{error.ID}</td>
                            <td>{error.Name}</td>
                            <td>{error.Price}</td>
                            <td>{error.Quantity}</td>
                            <td>{error.Score}</td>
                            <td style={{ color: 'red' }}>{error.ERROR}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              }
            </div>
          </>
        ) : historiqueCSV.length > 0 ? (
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
        ) : null}
      </section>
    </div>
  )
}

export default CSVConverter
