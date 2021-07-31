import React from "react";
import { connect } from "react-redux";
import _ from "lodash"
import fileDownload from 'js-file-download'
import axios from "axios";

import { setModal } from "../actions";
import Chart from "./BarCharts/Chart";
import Modal from "./Modal"
import { ocAnalyzeAPI} from "../apis/nse";
class OptionChain extends React.Component {

  renderChart = (data) => {
    return (<div style={{
      paddingBottom: '56.25%', /* 16:9 */
      position: 'relative',
      height: 0
    }} onClick={this.onClickChart(data)}>
      <div style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%'
      }}>
        <Chart chartData={data} />
      </div>
    </div>)
  }

  onClickChart = (data) => e => {
    const modal = {
      flag: !this.props.modalFlag,
      data
    }
    this.props.setModal(modal)
  }

  downloadData = async(index,data) => {
    let response =""
    console.log("a")
    try {
      response = await ocAnalyzeAPI.post(`/download/${index}`, data,{
        responseType:'blob'
      })
      response = response.data
      console.log(response)
      fileDownload(response,`${index}.xlsx`)
    } catch (err) {
      console.log(err)
      response = err.response;
    }
  }

  render() {
    return (<div>
      {_.isEmpty(this.props.OIData)&& _.isEmpty(this.props.COIData)?<div className="ui two column centered grid">
        <h3>Please Choose the Stock/Index and Expiry Date for Option Chain Analysis</h3>
      </div>:<div>
      
      <div className="ui equal width grid">
        <div className="equal width row">
          <div className="ui two column centered grid">StrikePrice vs OI</div>
          <div className="ui two column centered grid">StrikePrice vs CiOI</div>
        </div>
        <div className="equal width row">
          <div className="column">
            {this.renderChart(this.props.OIData)}
          </div>
          <div className="column">
            {this.renderChart(this.props.COIData)}
          </div>
        </div>
      </div>
      <div className="ui two column centered grid">
        <button type="button" className="ui primary button" onClick={()=>this.downloadData(this.props.selectedIndex,this.props.OCData)}><i className="save icon"></i>Save Option Chain data</button>
      </div>
      </div>}
      {this.props.modal.flag &&
        this.props.modal.data ? (
        <Modal
          data={this.props.modal.data}
          onDismiss={() => {
            this.props.setModal({
              flag: !this.props.modal.flag,
              data: []
            });
          }}
        />
      ) : null}
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    underlyingValue: state.oc.underlyingValue,
    timeStamp: state.oc.timeStamp,
    index: state.oc.selectedIndex,
    OCData: state.oc.OCData,
    OIData: state.oc.OIData,
    COIData: state.oc.COIData,
    modal: state.oc.modal,
    selectedIndex:state.oc.selectedIndex,
    selectedExpiry: state.oc.selectedExpiry,
  };
};

export default connect(mapStateToProps, { setModal })(OptionChain);
