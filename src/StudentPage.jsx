// import { useEffect, useState, useCallback, Fragment, useRef } from "react";
// // import BaseButton from "./components/BaseButton";
// import StyledHeaderComponent from "./components/Header";
// import BaseModal from "./components/Modal";
// import QuestionForm from "./components/TestForm";
// import questions from "../questions";
// import FooterComponent from "./components/Footer";

// export default function StudentsPage () {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//   useEffect(() => {
//     const savedIndex = localStorage.getItem('currentQuestionIndex');
//     if (savedIndex) {
//       setCurrentQuestionIndex(parseInt(savedIndex, 10));
//     }
//   }, []);

//   const handleQuestionIndex = () => {
//     setCurrentQuestionIndex(currentQuestionIndex + 1);
//     localStorage.setItem('currentQuestionIndex', String(currentQuestionIndex + 1));
//   };
//     return (
//         <Fragment>
//         <StyledHeaderComponent>Страница ученика</StyledHeaderComponent>
        <BaseModal>
        <h2>Правила проведения теста</h2>
        <p>Перед тобой несколько разных высказываний.<br/> Пожалуйста, прочти их и подумай – согласен ты с этими высказываниями или нет. <br/>Если согласен, то нажми на соответсвующую кнопку, затем далее (или клавишу Enter(для пк)) (+1, +2, +3 или +4) в специальном бланке рядом с номером этого высказывания.<br/> Если ты не согласен с каким-нибудь высказыванием, то поставь отрицательную оценку (-1, -2, -3, или –4).

        <br/>«+4» - несомненно, да (очень сильное согласие);

        <br/>«+3» - да, конечно (сильное согласие);

        <br/>«+2» - в общем, да (среднее согласие);

        <br/>«+1» - скорее да, чем нет (слабое согласие);

        <br/>«0» - ни да, ни нет;

        <br/>«–1» - скорее нет, чем да (слабое несогласие);

        <br/>«–2» - в общем, нет (среднее несогласие);

        <br/>«–3» - нет, конечно (сильное несогласие);

        <br/>«–4» - нет, абсолютно неверно (очень сильное несогласие).

        <br/>Постарайся быть честным. Здесь не может быть «правильных» и «неправильных» оценок. <br/>Важно лишь, чтобы они выражали только твое личное мнение. <br/> Спасибо тебе заранее!</p>
        </BaseModal>
//         <QuestionForm         
//         question={questions[currentQuestionIndex].question}
//         onNextQuestion={handleQuestionIndex}/>
//         <FooterComponent/>
//         </Fragment>
//     )
// }

import { useEffect, useState } from "react";
import StyledHeaderComponent from "./components/Header";
import BaseModal from "./components/Modal";
import QuestionForm from "./components/TestForm";
import questions from "../questions";
import FooterComponent from "./components/Footer";

export default function StudentsPage() {
 const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

 useEffect(() => {
    const savedIndex = sessionStorage.getItem('currentQuestionIndex');
    if (savedIndex) {
      const parsedIndex = parseInt(savedIndex, 10);
      if (!isNaN(parsedIndex) && parsedIndex < questions.length) {
        setCurrentQuestionIndex(parsedIndex);
      }
    }
 }, []);

 const handleQuestionIndex = () => {
  setCurrentQuestionIndex(prevIndex => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < questions.length) {
          sessionStorage.setItem('currentQuestionIndex', String(nextIndex));
          return nextIndex;
      } else {
          console.log("Все вопросы были пройдены.");
          return prevIndex; // Возвращаем предыдущий индекс, если достигнут конец списка
      }
  });
};

 return (
    <>
      <StyledHeaderComponent>Страница ученика</StyledHeaderComponent>
      <BaseModal>
        <h2>Правила проведения теста</h2>
        <p>Перед тобой несколько разных высказываний.<br/> Пожалуйста, прочти их и подумай – согласен ты с этими высказываниями или нет. <br/>Если согласен, то нажми на соответсвующую кнопку, затем далее (или клавишу Enter(для пк)) (+1, +2, +3 или +4) в специальном бланке рядом с номером этого высказывания.<br/> Если ты не согласен с каким-нибудь высказыванием, то поставь отрицательную оценку (-1, -2, -3, или –4).

        <br/>«+4» - несомненно, да (очень сильное согласие);

        <br/>«+3» - да, конечно (сильное согласие);

        <br/>«+2» - в общем, да (среднее согласие);

        <br/>«+1» - скорее да, чем нет (слабое согласие);

        <br/>«0» - ни да, ни нет;

        <br/>«–1» - скорее нет, чем да (слабое несогласие);

        <br/>«–2» - в общем, нет (среднее несогласие);

        <br/>«–3» - нет, конечно (сильное несогласие);

        <br/>«–4» - нет, абсолютно неверно (очень сильное несогласие).

        <br/>Постарайся быть честным. Здесь не может быть «правильных» и «неправильных» оценок. <br/>Важно лишь, чтобы они выражали только твое личное мнение. <br/> Спасибо тебе заранее!</p>
        </BaseModal>
      <QuestionForm
        question={questions[currentQuestionIndex]}
        onNextQuestion={handleQuestionIndex}
      />
      <FooterComponent />
    </>
 );
}