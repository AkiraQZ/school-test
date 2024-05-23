import { useEffect, useState, Fragment } from "react";
import styled from "styled-components";
import StyledHeaderComponent from "./components/Header";
import BaseModal from "./components/Modal";
import QuestionForm from "./components/TestForm";
import FooterComponent from "./components/Footer";
import axios from "axios";

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
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function sendResult () {
    try {
      const userId = sessionStorage.getItem('userId');
      const results = sessionStorage.getItem('answers')
      .slice(1, -1)
      .split(",");
      await axios.put(`http://localhost:5550/student/${userId}`, {
        results: results
      })
    }catch (err) {
    console.log(err)
  }
}

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5550/questions");
        const data = await response.data.sort((a, b) => a.id - b.id)
        setQuestions(data);
        setIsLoading(false);
      } catch (err) {
        console.error(`Cannot get data: ${err}`);
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const savedIndex = sessionStorage.getItem('currentQuestionIndex');
    if (savedIndex) {
      const parsedIndex = parseInt(savedIndex, 10);
      if (!isNaN(parsedIndex) && parsedIndex < questions.length) {
        setCurrentQuestionIndex(parsedIndex);
      }
    }
  }, [questions]);


   const  handleQuestionIndex = () => {
    setCurrentQuestionIndex(prevIndex => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < questions.length) {
      //Вернуть эту строку после тестов
        // if (nextIndex < 4) {
        sessionStorage.setItem('currentQuestionIndex', String(nextIndex));
        return nextIndex;
      } else {
        sendResult()
        console.log("Все вопросы были пройдены.");
        setShowThankMsg(true);
        sessionStorage.removeItem('recRole');
        sessionStorage.removeItem('currentQuestionIndex');
        sessionStorage.removeItem('answers');
        sessionStorage.removeItem('userId');
        return prevIndex;
      }
    });
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div> // Можно заменить на индикатор загрузки
      ) : (
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
                question={questions.length > 0 ? questions[currentQuestionIndex] : null}
                onNextQuestion={handleQuestionIndex}
                isLastQuestion={showThankMsg}
              />
              <FooterComponent />
            </>
          )}
        </>
      )}
    </>
  );
}
