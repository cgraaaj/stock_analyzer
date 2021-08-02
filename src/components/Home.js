import React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { fetchData, changeMode, analyzeOptionChain, setFormValues } from "../actions";
import { Form, Field } from "react-final-form";

class Home extends React.Component {

  // componentDidMount() {
  //   this.props.fetchData(this.props.index, this.props.symbol);
  // }

  onFormSubmit = (values) => {
    console.log(values);
    this.props.analyzeOptionChain({ ...values, data: this.props.data });
    this.props.setFormValues(values)
  };

  onClickRefresh = (values) => {
    console.log(values)
    this.props.fetchData(this.props.index, values.index);
  }

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

  onChangeIndex = (event, input) => {
    console.log(event.target.value);
    input.onChange(event.target.value);
    this.props.fetchData(this.props.index, event.target.value);
  };

  onChangeExpiry = (event, input) => {
    console.log(event.target.value);
    input.onChange(event.target.value);
  };

  renderButton = ({ input, label, meta }) => {
    return (
      <div className="six column centered row">
        <div className="column">
          <label>{label}</label>
        </div>
        <div className="column">
          <button
            type="button"
            className="ui button"
            onClick={() => {
              if (input.value === "INDEX") {
                this.props.changeMode("STOCK");
              } else {
                this.props.changeMode("INDEX");
              }
            }}
          >
            {input.value}
          </button>
        </div>
        {this.renderError(meta)}
      </div>
    );
  };

  renderList = ({ input, label, options }) => {
    return (
      <div className="six column centered row">
        <div className="column">
          <label>{label}</label>
        </div>
        <div className="column">
          {_.isEmpty(options) ? (
            <div className="ui disabled dropdown">
              Select <i className="dropdown icon"></i>
              <div className="menu">
                <div className="item">Choice 1</div>
              </div>
            </div>
          ) : (
            <select
              className="ui search dropdown"
              onChange={
                label === "Expiry"
                  ? (e) => this.onChangeExpiry(e, input)
                  : (e) => this.onChangeIndex(e, input)
              }
              defaultValue={input.value}
            >
              {options.map((option) => (
                <option key={option.key} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="ui container">
        <div className="ui main right aligned text container">Data fetched at: {this.props.refreshedAt ? this.props.refreshedAt : '--'}</div>
        <div className="ui segment">
          <Form
            onSubmit={this.onFormSubmit}
            initialValues={this.props.initialValues}
            // validate={this.validate}
            render={({ handleSubmit, values }) => (
              <form className="ui form error" onSubmit={handleSubmit}>
                <div className="ui two column centered grid">
                  <Field name="mode" component={this.renderButton} label="Mode" />
                  <Field
                    name="index"
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
                  <div className="eight column centered row">
                    <div className="column">
                      <button
                        type="submit"
                        className={
                          values.hasOwnProperty("expiry") &&
                            !_.isEmpty(values.expiry)
                            ? "ui primary button" : "ui disabled button"
                        }
                      >
                        Submit
                      </button>
                    </div>
                    <div className="column">
                      <button
                        type="button"
                        className={
                          values.hasOwnProperty("index") &&
                            !_.isEmpty(values.index)
                            ? "ui secondary button" : "ui disabled button"
                        }
                        onClick={() => { this.onClickRefresh(values) }}
                      >
                        Refresh
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.conf.formValues);
  return {
    initialValues: { mode: state.conf.formValues.mode, index: state.conf.formValues.index, expiry: state.conf.formValues.expiry },
    label: state.conf.label,
    indexList: state.conf.indexList,
    index: state.conf.index,
    expiryDates: state.conf.expiryDates,
    data: state.conf.data,
    refreshedAt: state.conf.refreshedAt,
  };
};

export default connect(mapStateToProps, {
  fetchData,
  changeMode,
  analyzeOptionChain,
  setFormValues
})(Home);
