import {  createSlice } from "@reduxjs/toolkit"
import { data } from "./data";
 
const initialState = {
  data: data, 
  totalRightAns: 0,
  percentAns: 0,
  startQuiz: false,
  showNumofQuestions: 4, 
  ButtonStartDisabled: false,
  showStat: false,
  warningMessage: '',
  deadlineTime: 10, // основное время теста
  showLimit: false,
  extraTime: 0,
  totalTimeValue: 0,
  }
const quizSlice  = createSlice({
  name: 'quizSlice',  
   initialState:  initialState,  
  reducers: {
    // тоглим показ Вопросов 
    toggleStartQuiz: (state) => {  
     state.startQuiz  = !state.startQuiz
   }, 
   // добавляем ответ юзера в store
   handleUserAnswer: (state, {payload}) => {  
   const { id, itemOption } = payload
    state.data = state.data.map((item)=> {
  if(item.id ===id) {
    return  {...item, userAnswer: itemOption  } 
    }
  return item
  })
  },
   // кол-во правильных ответов
  setTotalRightAns: (state, {payload})=> {
    state.totalRightAns += payload 
  },
  // добавляем в объект isRightAnswer прав/неправ ответ  
  setIsRightAnswer: (state, {payload})=> {
    const {id} = payload
    state.data  = state.data.map((item)=> {
      if(item.id ===id) {
        return  {...item, isRightAnswer: true,     } 
        }
      return item
      })
  },
  // тоглим показ Статистики
  setShowStat: (state)=> {
    state.showStat = !state.showStat
  },
  // показ Warning если не все вопросы отмечены ответами
  setWarningMessage: (state, {payload})=> {
    state.warningMessage = payload
  },
  // тоглим активность кнопки Начать тест
  setButtonStartDisabled: (state )=> {
    state.ButtonStartDisabled =  !state.ButtonStartDisabled
  },
  // показываем Warning что основное время истекло
  setShowLimit: (state, {payload} )=> {
    state.showLimit =  payload
  },
  // меняем счетчик DeadLineTime
  setDeadlineTime: (state, {payload} )=> {
    state.deadlineTime +=  payload
  },
  // счетчик  ExtraTime
  setExtraTime: (state, {payload} )=> {
    state.extraTime +=  payload
  },
  // Общее время теста
  setTotalTimeValue: (state, {payload} )=> {
    state.totalTimeValue +=  payload
  },
  // получаем процент правильных ответов
  setPercentAns : (state)=> {
   return {...state, percentAns: parseInt((state.totalRightAns * 100) / state.showNumofQuestions) + "%"}
  //или так  state.percentAns = parseInt((state.totalRightAns * 100) / state.showNumofQuestions) + "%";
  },
  // сортируем массив при повторном тесте
  sortQuizData : (state)=> {
    state.data.sort(() => Math.random() - 0.5 );
  },
  }  
 })
  export const {
    toggleStartQuiz,
    handleUserAnswer,
    toggleIsRight,
    setTotalRightAns,
    setIsRightAnswer,
    setShowStat,
    setWarningMessage,
    setButtonStartDisabled,
    setShowLimit,
    setDeadlineTime,
    setExtraTime,
    setTotalTimeValue,
    setPercentAns,
    sortQuizData
  } = quizSlice.actions;  
  export default quizSlice.reducer    

 
