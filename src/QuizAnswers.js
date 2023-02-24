import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { handleUserAnswer, setIsRightAnswer, setTotalRightAns  } from './QuizSlice'

export default function QuizAnswers({item}) {
  const {id, options, answer } = item
  const [isRight, setIsRight] = useState(false) // доп. переменная тоглим
  const dispatch = useDispatch()
   
   function  handleAnswer(itemOption ) { 
    //сначала передаем вариант ответа юзера в store
    dispatch(handleUserAnswer({id, itemOption }))
     // затем проверяем на условие  - прав./неправ. ответ + ограничиваем повторные клики на том же варианте
    if(itemOption === answer&&isRight!==true ) {
         setIsRight(true)  
      // считаем прав. ответы
      dispatch(setTotalRightAns(1))
      //добавляем в свойство объекта прав. ответ
      dispatch(setIsRightAnswer(id))
  } 
    //  если неправильный
    if(itemOption !== answer&&isRight===true ) {
       setIsRight(false)
       dispatch(setTotalRightAns(-1))
    } 
     }
  return (
    <>
    <ul className='answer-item' > 
        {options.map((itemOption, i)=> { 
     return (  <li  key={i} 
  onClick={()=> handleAnswer(itemOption )} 
 className={item.userAnswer === itemOption ? 'quiz-item  active': 'quiz-item '} >{itemOption}</li>
      )})  
    }
     </ul>
   </>
  )
}
