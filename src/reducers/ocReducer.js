import { ANALYZE_OPTIONS } from "../actions/types";

const INTIAL_STATE = {
  timeStamp: "",
  underlyingValue: 0,
  expiryDates: [],
  OIData: [],
  COIData: [],
  strikePrices: [],
  selectedMode:"",
  selectedIndex:"",
  selectedExpiry:"",
};

const ocReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case ANALYZE_OPTIONS:
      let filterData = action.payload.data.data.filter(d => d.expiryDate === action.payload.expiry)
      let OIData = filterData.map(d=>{
        let OI = {}
        OI['strikePrice']= d.strikePrice
        if (d.hasOwnProperty('CE')){
          OI['CE'] = d.CE.openInterest
        } else {
          OI['CE'] = 0
        }
        if (d.hasOwnProperty('PE')){
          OI['PE'] = d.PE.openInterest
        } else {
          OI['PE'] = 0
        }
        return OI
      })
      let COIData = filterData.map(d=>{
        let COI = {}
        COI['strikePrice']= d.strikePrice
        if (d.hasOwnProperty('CE')){
          COI['CE'] = d.CE.changeinOpenInterest
        } else {
          COI['CE'] = 0
        }
        if (d.hasOwnProperty('PE')){
          COI['PE'] = d.PE.changeinOpenInterest
        } else {
          COI['PE'] = 0
        }
        return COI
      })
      return {
        ...state, timeStamp: action.payload.data.timestamp, underlyingValue: action.payload.data.underlyingValue,
        expiryDates: action.payload.data.expiryDates, OIData,COIData, strikePrices: action.payload.data.strikePrices,
        selectedMode:action.payload.mode,selectedExpiry:action.payload.expiry, selectedIndex: action.payload.index
      };
    default:
      return state;
  }
};

export default ocReducer