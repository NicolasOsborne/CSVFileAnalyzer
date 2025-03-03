import { useState } from 'react'

function CSVConverter() {
  const [CSVFile, setCSVFile] = useState()
  const [csvOutput, setCsvOutput] = useState<object|null>({
    headers:[],
    rows:[]
  });
  const [historiqueCSV, setHistoriqueCSV] = useState<object[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [detailAnnalyse, setDetailAnnalyse] = useState<object>({});


  const handleChange = (e) => {
    setCSVFile(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (CSVFile) {

      const fileName = CSVFile.name.split("\\");
      const CSVOutput = {
        "analysis": {
          "mean":"",
          "median" : "This is a median",
          "standard-deviation":"",
          "global-quantity":"",
          "mean-score":""
        },
        "list-product":{
          "product1":{
            "id":"1",
            "name":"Nom du Produit 1",
            "price":"230",
            "quantity":"3",
            "score":"2.19"
          },
          "product2":{
            "id":"2",
            "name":"Nom du Produit 2",
            "price":"45",
            "quantity":"6",
            "score":"55.9"
          }
        },
        "list-error":{
          "product1":{
            "id":"1",
            "name":"Produit 3",
            "price":"55",
            "quantity":"1",
            "score":"22.9",
            "error":"BAD name"
          },
          "product2":{
            "id":"2",
            "name":"Produit 2",
            "price":"660",
            "quantity":"3",
            "score":"33.5",
            "error":"BAD name"
          }
        }
      }

      console.log(CSVOutput)

      setHistoriqueCSV((prev) => {
        if (prev.some((item) => item.name === fileName)) {
          console.log('icic');
          return prev;
        }
        console.log( { name: fileName[fileName.length - 1], content: CSVOutput });
        return [...prev, { name: fileName[fileName.length - 1], content: CSVOutput}];
      });
    }
  }

  const showHistoriqueCSV = (analyse) => {
    setShow(true);
    setDetailAnnalyse(analyse);
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
      <div style={{ padding: '10px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {historiqueCSV.length > 0 && show ?
            (
            <div>
              <button onClick={()=>setShow(false)}>Retour Historique</button>

              {
                  <div style={{ marginBottom: "20px" }}>
                    <h3>{detailAnnalyse.name}</h3>

                    <h4>Analyse</h4>
                    <table border="1" style={{ width: "100%", textAlign: "left" }}>
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
                        <td>{detailAnnalyse.content.analysis["standard-deviation"]}</td>
                        <td>{detailAnnalyse.content.analysis["global-quantity"]}</td>
                        <td>{detailAnnalyse.content.analysis["mean-score"]}</td>
                      </tr>
                      </tbody>
                    </table>

                    <h4>Produits Valides</h4>
                    <table border="1" style={{ width: "100%", textAlign: "left" }}>
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
                      {Object.values(detailAnnalyse.content["list-product"]).map((product: any, idx) => (
                          <tr key={idx}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.score}</td>
                          </tr>
                      ))}
                      </tbody>
                    </table>

                    <h4>Produits en Erreur</h4>
                    <table border="1" style={{ width: "100%", textAlign: "left" }}>
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
                      {Object.values(detailAnnalyse.content["list-error"]).map((error: any, idx) => (
                          <tr key={idx}>
                            <td>{error.id}</td>
                            <td>{error.name}</td>
                            <td>{error.price}</td>
                            <td>{error.quantity}</td>
                            <td>{error.score}</td>
                            <td style={{ color: "red" }}>{error.error}</td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
              }
            </div>
        ) : historiqueCSV.length > 0 ?
            <table border="1" style={{width: "100%", textAlign: "left"}}>
              <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Detail</th>
              </tr>
              </thead>
              <tbody>
              {
                historiqueCSV.map((file, index) => (
                    <tr key={index}>
                      <td key={index}>{file.name}</td>
                      <td>OK</td>
                      <td>
                        <button style={{background: '#3eadce', textAlign: 'center', width: 50}}
                                onClick={() => showHistoriqueCSV(file)}>Voir
                        </button>
                      </td>
                    </tr>
                ))
              }
              </tbody>
            </table>
        :null
        }

      </div>
    </div>
  )
}

export default CSVConverter
