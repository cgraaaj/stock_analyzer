
const renderData=(data,row)=> {
  let headers = Object.keys(data)
  return headers.map((header,i) => <td key={i} data-label={header}>{data[header][row]}</td>)
}

const renderRows=(data,rows)=>{
 return rows.map((row,i) => <tr key={i}>{renderData(data,i)}</tr>)
}

export const optionChainTableRender = (data) => {
  let headers = Object.keys(data)
  let rows = Object.keys(data[headers[0]])
  return (
    <table className="ui celled table">
      <thead>
        <tr>
          {headers.map((header,i) => <th key={i}>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {renderRows(data,rows)}
      </tbody>
    </table>
  )
}