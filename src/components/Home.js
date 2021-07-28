import React from "react";
import { connect } from "react-redux";
import _ from 'lodash'

import { fetchData, changeMode } from "../actions";
import { Form, Field } from "react-final-form";

class Home extends React.Component {
  // check why form word not persist 
  // componentDidMount() {
  //   this.props.fetchData(this.props.index, this.props.symbol);
  // }

  onFormSubmit = ({ index, symbol }) => {
    this.props.fetchData(index, symbol);
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="header" style={{ color: "#9f3a38" }}>
          {error}
        </div>
      );
    }
  }

  validate = (formValues) => {
    const errors = {};
    if (!formValues.word) {
      errors.word = "Dobby would need something to search, Sir/Madam...";
    }
    return errors;
  };

  renderButton = ({ input, label, meta }) => {
    return (
      <div className="ui four column grid">
        <div className="row">
          <div className="column">
            <label>{label}</label>
          </div>
          <div className="column">
            <button type="button" className="ui button" onClick={() => {
              if (input.value === 'INDEX') {
                this.props.changeMode('STOCK')
              } else {
                this.props.changeMode('INDEX')
              }
            }}>{input.value}</button>
          </div>
        </div>
        {this.renderError(meta)}
      </div>
    );
  };

  renderList = ({ input, label, options }) => {
    return (
      <div className="ui four column grid">
        <div className="row">
          <div className="column">
            <label>{label}</label>
          </div>
          <div className="column">
            {_.isEmpty(options) ? <div className="ui disabled dropdown">
              Select <i className="dropdown icon"></i>
              <div className="menu">
                <div className="item">Choice 1</div>
              </div>
            </div> : <select className="ui search dropdown" onChange={(event) => {
              console.log(event.target.value)
              this.props.fetchData(this.props.index, event.target.value);
            }}>
              {options.map(option => <option key={option.key} value={option.value}>{option.text}</option>)}
            </select>}

          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="ui container">
        <div className="ui segment">
          <Form
            onSubmit={this.onFormSubmit}
            initialValues={this.props.initialValues}
            // validate={this.validate}
            render={({ handleSubmit }) => (
              <form
                className="ui form error"
                onSubmit={handleSubmit}
              >
                <Field
                  name="mode"
                  component={this.renderButton}
                  label="Mode"
                />
                <Field
                  name="label"
                  component={this.renderList}
                  label={this.props.label}
                  options={this.props.indexList}
                />
                <Field
                  name="expiry"
                  component={this.renderList}
                  label="Expiry"
                  options={this.props.expiryDates}
                />
              </form>
            )}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    initialValues: { mode: state.conf.mode },
    label: state.conf.label,
    indexList: state.conf.indexList,
    index: state.conf.index,
    expiryDates: state.conf.expiryDates.map((expDate,i)=> ({key:i,value:expDate,text:expDate})),
  };
};

export default connect(mapStateToProps, { fetchData, changeMode })(
  Home
);
