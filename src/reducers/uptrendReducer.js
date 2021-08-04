import { UPTREND,CHANGE_OPTION,UPTREND_DATE } from "../actions/types";

const INTIAL_STATE = {
    data: [],
    dates:[],
    selectedDate: {},
    option:"nifty",
    uptrend:[],
    uptrendWithVolume:[]
};

const setUptrendData = (data,date,option) =>{
    console.log(data,date,option)
    let selectedDateData = data.filter(data => data.date === date)[0]
    console.log(selectedDateData)
    let uptrend = []
    let uptrendWithVolume = []
    uptrend = selectedDateData[option]['uptrend']
    uptrendWithVolume = selectedDateData[option]['vol_based']
    return{uptrend,uptrendWithVolume}
}

const uptrendReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case UPTREND:
            console.log(action.payload)
            let dates=action.payload.data.map((dateObj,i) => ({key:i, value: dateObj.date, text:dateObj.date}))
            let selectedDate = dates[dates.length-1]
            return { ...state, data: action.payload.data, dates, selectedDate }
        case CHANGE_OPTION:{
            let {uptrend, uptrendWithVolume} = setUptrendData(state.data,state.selectedDate,action.payload)
            return {...state, option:action.payload,uptrend, uptrendWithVolume}
        }
        case UPTREND_DATE:{
            console.log("Asdfasdf")
            let {uptrend, uptrendWithVolume} = setUptrendData(state.data,action.payload,state.option)
            return {...state, selectedDate: action.payload,uptrend, uptrendWithVolume}
        }
        default:
            return state
    }

}

export default uptrendReducer