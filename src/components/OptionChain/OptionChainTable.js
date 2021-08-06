import React from "react"
import { connect } from "react-redux";
class OptionChainTable extends React.Component {

  componentWillUnmount() {
    sessionStorage.removeItem("tableData");
  }

  renderData = (data, row) => {
    let headers = Object.keys(data)
    return headers.map((header, i) => <td key={i} data-label={header}>{data[header][row]}</td>)
  }

  renderRows = (data, rows) => {
    return rows.map((row, i) => <tr key={i}>{this.renderData(data, i)}</tr>)
  }

  render() {
    let headers = Object.keys(this.props.tableData)
    let rows = Object.keys(this.props.tableData[headers[0]])
    return (
      <table className="ui celled table">
        <thead>
          <tr>
            {headers.map((header, i) => <th key={i}>{header}</th>)}
          </tr>
        </thead>
        <tbody>
          {this.renderRows(this.props.tableData, rows)}
        </tbody>
      </table>
    )
  }
}
const mapStateToProps = (state) => {
  let tableData = JSON.parse(sessionStorage.getItem('tableData'))
  console.log(tableData)
  return {
    tableData
  };
};

export default connect(mapStateToProps, {})(OptionChainTable);