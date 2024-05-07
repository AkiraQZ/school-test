import { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import StyledHeaderComponent from "./components/Header";
import BaseModal from "./components/Modal";
import QuestionForm from "./components/TestForm";
import questions from "../questions";
import FooterComponent from "./components/Footer";

const ThankMsg = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 2rem;
  text-align: center;
  color: #333;
  height: 100vh;
  width: 100%;
  text-align: center;
`;

export default function StudentsPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showThankMsg, setShowThankMsg] = useState(false);

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
        setShowThankMsg(true);
        sessionStorage.removeItem('recRole');
        sessionStorage.removeItem('currentQuestionIndex');
        sessionStorage.removeItem('answers');
        return prevIndex; // Возвращаем предыдущий индекс, если достигнут конец списка
      }
    });
  };

  return (
    <>
      {showThankMsg ? (
        <Fragment>
        <StyledHeaderComponent>Страница ученика</StyledHeaderComponent>
        <ThankMsg>
          Спасибо за прохождение теста!
        </ThankMsg>
        <FooterComponent />
        </Fragment>
      ) : (
        <>
          <StyledHeaderComponent>Страница ученика</StyledHeaderComponent>
          <BaseModal>
            <h2>Правила проведения теста</h2>
            <p>Перед тобой несколько разных высказываний.<br/> Пожалуйста, прочти их и подумай – согласен ты с этими высказываниями или нет. <br/>Если согласен, то нажми на соответсвующую кнопку, затем далее (или клавишу Enter(для пк)) (+1, +2, +3 или +4) в специальном бланке рядом с номером этого высказывания.<br/> Если ты не согласен с каким-нибудь высказыванием, то поставь отрицательную оценку (-1, -2, -3, или –4).

            <br/>«+4» - несомненно, да (очень сильное согласие);
            ...
            </p>
          </BaseModal>
          <QuestionForm
            question={questions[currentQuestionIndex]}
            onNextQuestion={handleQuestionIndex}
            isLastQuestion={showThankMsg}
          />
          <FooterComponent />
        </>
      )}
    </>
  );
}