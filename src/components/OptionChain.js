import React from "react";
import { connect } from "react-redux";

// import { } from "../actions";
import Chart from "./BarCharts/Chart";
class OptionChain extends React.Component {

  renderChart = (data) => {
    return (<div style={{
      paddingBottom: '56.25%', /* 16:9 */
      position: 'relative',
      height: 0
    }} >
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

  render() {
    return (<div>
      <div className="ui two column centered grid">
      <h4>Underlying value of  {this.props.index} is {this.props.underlyingValue} as on {this.props.timeStamp}</h4>
      </div>      
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
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    underlyingValue: state.oc.underlyingValue,
    timeStamp: state.oc.timeStamp,
    index: state.oc.selectedIndex,
    OIData: state.oc.OIData,
    COIData: state.oc.COIData
  };
};

export default connect(mapStateToProps, {})(OptionChain);
