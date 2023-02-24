import React, {useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuizAnswers from "./QuizAnswers";
import { setButtonStartDisabled, setDeadlineTime, setExtraTime, setPercentAns, setShowLimit, setShowStat, setTotalTimeValue, setWarningMessage, sortQuizData, toggleStartQuiz } from "./QuizSlice";
import { store } from "./store";
 export default function Quiz() {
 
  const dispatch = useDispatch()
  const {data,showNumofQuestions,ButtonStartDisabled, startQuiz, deadlineTime, showLimit, extraTime, warningMessage, showStat, totalRightAns, percentAns, totalTimeValue } = useSelector((state)=> state.QuizSlice )
 
  const extraCount = useRef(); // нужен для clearInterval
  function showRightAnswers() {
    const sumUserAns = data.filter((item) => item.userAnswer).length;
       // cверяем sumUserAns и кол-во показанных вопросов - если равны значит на все ответил
    if (sumUserAns === showNumofQuestions) {
      // по клику на кнопке Показать результат также останавливаем счетчик
      clearInterval(extraCount.current);  
      dispatch(setShowStat( )); // показываем статистику и прав. ответы
      dispatch(setWarningMessage(""));  // очищаем warning
    } else {
      dispatch(setWarningMessage("Вы не ответили на все вопросы!"));
    }
    // процент правил. ответов
    dispatch(setPercentAns())
  }
 
  // Счетчик
  function handleQuiz() {
     // при начале каждого нового теста будем рандомно сортировать массив
    dispatch(sortQuizData())
   // показываем вопросы при начале теста
      dispatch(toggleStartQuiz())
     dispatch( setButtonStartDisabled(true))
     // Включаем обратный счетчик
     extraCount.current = setInterval(() => {
    let currDeadlineTime = store.getState().QuizSlice.deadlineTime 
 // когда основное время кончается - останавливаем на 0 и включаем extra счетчик
    if (currDeadlineTime === 0) {
     dispatch(setShowLimit(true)) // показываем элемент extraTime в разметке  
      dispatch(setDeadlineTime(0)) // останавливаем счетчик основной
      dispatch(setExtraTime(1)) // счетчик доп. времени
    
    } else {
      dispatch(setDeadlineTime(-1))  
    }
      // общее кол-времени прохождения теста покажем в статистике
    dispatch(setTotalTimeValue(1))
  }, 1000);
    };
     
 return (
    <>
  <h3>Проверь себя за 10 секунд!</h3>
  <button disabled={ButtonStartDisabled} onClick={()=> handleQuiz()}>Начать тест</button>

  { startQuiz && (
<div className="quizWrapper">
<div className="quizWrapper__timelimit">
<div>До конца теста осталось: {deadlineTime} </div>

{showLimit && (
  <div className="limitTime">
    Вы превысили лимит времени на: {extraTime} сек.
  </div>
)}

</div>
<div className="questionWrapper">
  {/*показываем только 4 первых вопроса */}
{data.filter((_, i) => i <= showNumofQuestions - 1).map((item, i) => {
return (
  <div className="questionItem" key={i}>
    <h4>№{item.id}: {item.question}</h4>
    <QuizAnswers item={item}/>
  </div>
); })
}
</div>
<button onClick={() => showRightAnswers()}>Показать результаты</button>
  <hr />
  {showStat && (
  <div className="statisticWrapper">
    <div className="statAnswerWrapper">
      {
        // показываем только 4 ответа за один тест
        data.filter((_, i) => i <= showNumofQuestions - 1).map((item, i) => {
    return (
      <div key={i} className={item.answer === item.userAnswer
            ? "statRightAnswers" : "statNoRightAnswer" } >
        <h4>Вопрос №{item.id} </h4>
        <hr />
    <div>Верный ответ: <span>{item.answer}</span>
    </div>
    <div>Ваш ответ: <span>{item.userAnswer}</span>
    </div>
  </div>
);
}
   )
      }
    </div>
    <h4>Статистика:</h4>
    <hr />
    <ul className="staitc-items">
      <li>
        Всего вопросов в базе: <span>{data.length}</span>
      </li>
      <li>
        Правильных ответов: <span>{totalRightAns}</span> из{" "}
        <span>{showNumofQuestions}</span>{" "}
      </li>
      <li>
        Процент правильных ответов: <span>{percentAns}</span>
      </li>
      <li>
        Тест пройден за: <span>{totalTimeValue}</span> сек.
      </li>
    </ul>
    <button
      onClick={() => { window.location.reload();}}>Повторить Тест</button>
  </div>
)
}
 </div>
      )  
     }
<h4 style={{ color: "red" }}>{warningMessage}</h4>
    </>
  );
}
