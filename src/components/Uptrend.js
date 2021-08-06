import React from "react";
import { connect } from "react-redux";
import _ from "lodash"

import { getUptrend, changeOption, changeDate } from "../actions";

class OptionChain extends React.Component {
    componentDidMount() {
        this.props.getUptrend()
    }
    componentDidUpdate() {
        if (!_.isEmpty(this.props.selectedDate)) {
            this.props.changeDate(this.props.selectedDate)
        }
    }
    onChangeRadio = (e) => {
        console.log(e.currentTarget.value)
        this.props.changeOption(e.currentTarget.value)
    }
    onChangeDate = (e) => {
        console.log(e.currentTarget.value)
        this.props.changeDate(e.currentTarget.value)
    }
    populateItems = (items) => {
        return items.map((item, i) =>
            <div className="row" key={i}>
                {_.isObject(item) ? `${item.name}-${item.volume}` : item}
            </div>
        )
    }
    render() {
        return (<div className="ui container">
            <div className="ui segment">
                <div className="ui grid">
                    <div className="four column centered row">
                        <div className="right four wide aligned column">
                            <label>Date</label>
                        </div>
                        <div className="column">
                            {_.isEmpty(this.props.dates) ? (
                                <div className="ui disabled dropdown">
                                    Select <i className="dropdown icon"></i>
                                    <div className="menu">
                                        <div className="item">Choice 1</div>
                                    </div>
                                </div>
                            ) : (
                                <select
                                    className="ui dropdown"
                                    onChange={this.onChangeDate}
                                    value={this.props.selectedDate.value}
                                >
                                    {this.props.dates.map((date) => (
                                        <option key={date.key} value={date.value}>
                                            {date.text}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>
                    <div className="four column centered row">
                        <div className="right alinged four wide column">
                            <div className="ui radio checkbox">
                                <input type="radio" name="nifty" onChange={this.onChangeRadio} checked={this.props.option === 'nifty'} value='nifty' />
                                <label>Index</label>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui radio checkbox">
                                <input type="radio" name="non_nifty" onChange={this.onChangeRadio} checked={this.props.option === 'non_nifty'} value='non_nifty' />
                                <label>Non-Index</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ui two column doubling grid container">
                    <div className="column">
                        <div className="segments">
                            <div className="ui center aligned segment">Uptrend</div>
                            <div className="ui center aligned segment">
                                {this.populateItems(this.props.uptrend)}
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="segments">
                            <div className="ui center aligned segment">Volume Based Uptrend</div>
                            <div className="ui center aligned segment">
                                {this.populateItems(this.props.uptrendWithVolume)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.uptrend.data,
        dates: state.uptrend.dates,
        selectedDate: state.uptrend.selectedDate,
        option: state.uptrend.option,
        uptrend: state.uptrend.uptrend,
        uptrendWithVolume: state.uptrend.uptrendWithVolume,
    };
};

export default connect(mapStateToProps, { getUptrend, changeDate, changeOption })(OptionChain);
