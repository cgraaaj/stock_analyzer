import history from "../history";
import { nseAPI, ocAnalyzeAPI} from "../utils/api";
import {
  FETCH_DATA,
  CHANGE_MODE,
  ANALYZE_OPTIONS,
  SET_MODAL,
  NOTIFY,
  SET_FORM_VALUES,
  DOWNLOAD_DATA,
  UPTREND,
  CHANGE_OPTION,
  UPTREND_DATE
} from "./types";

export const fetchData = (index, symbol) => async (dispatch) => {
  let response = "";
  console.log(index, symbol)
  try {
    response = await nseAPI.get('/option-chain', {
      params: {
        index,
        symbol
      }
    })
    console.log(response.data)
    response = response.data
  } catch (err) {
    console.log(err)
    response = err.response;
  }
  dispatch({
    type: FETCH_DATA,
    payload: { data: response },
  });
};

export const changeMode = (mode) => async (dispatch) => {
  let response = "";
  if (mode !== 'INDEX') {
    response = await nseAPI.get('/equities')
    console.log(response.data)
    response = response.data
  }
  dispatch({
    type: CHANGE_MODE,
    payload: {
      mode,
      data: response
    }
  })
}

export const analyzeOptionChain = (data) => {
  console.log(data)
  history.push("/oc_analyze")
  return {
    type: ANALYZE_OPTIONS,
    payload: data
  }
}

export const setModal = (modal) => {
  return {
    type: SET_MODAL,
    payload: modal,
  };
};

export const downloadData = (index, data) => async (dispatch) => {
  let response = "";
  console.log(index, data)
  try {
    response = await ocAnalyzeAPI.post(`/download/${index}`, data)
    response = response.data
    console.log(response)
  } catch (err) {
    console.log(err)
    response = err.response;
  }
  dispatch({
    type: DOWNLOAD_DATA,
    payload: { data: response },
  });
};

export const setFormValues = (formValues) => {
  return {
    type: SET_FORM_VALUES,
    payload: {...formValues},
  };
}

export const getUptrend = () => async (dispatch) => {
  let response = "";
  try {
    response = await ocAnalyzeAPI.get(`/uptrend`)
    response = response.data
    console.log(response)
  } catch (err) {
    console.log(err)
    response = err.response;
  }
  dispatch({
    type: UPTREND,
    payload: response,
  });
};

export const changeOption = (value) => {
  console.log(value)
  return {
    type: CHANGE_OPTION,
    payload: value,
  };
}

export const selectDate = (date) =>{
  return{
    type: UPTREND_DATE,
    payload: date
  }
}