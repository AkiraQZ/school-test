import { useState } from "react";
import styled from "styled-components";
import BaseButton from "./BaseButton";


const QuestionFormContainer = styled.form`
 display: flex;
 flex-direction: column;
 align-items: flex-start;
 margin-top: 5rem;
 background-color: #f2f2f2;
 padding: 2rem;
 border-radius: 0.5rem;
 box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const QuestionTitle = styled.h2`
 font-size: 2rem;
 font-weight: bold;
 margin-bottom: 2rem;
 color: #333;
`;

const OptionContainer = styled.div`
 display: flex;
 align-items: center;
 justify-content: center;
 margin-bottom: 1rem;
 cursor: pointer;
`;

const OptionInput = styled.input`
 margin-right: 0.5rem;
`;

const OptionLabel = styled.label`
 font-size: 1.5rem;
 color: #333;
`;

const OptionsContainer = styled.div`
 display: flex;
 gap: 1rem;
 flex-direction: row;
 @media screen and (max-width: 1040px) {
    flex-direction: column;
 }
`;


function QuestionForm({ question, onNextQuestion }) {
 const [selectedValues, setSelectedValues] = useState({});
 
 

 const handleChange = (event) => {
    const { value } = event.target;
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [question.id]: value, 
    }));
 };

 const handleSubmit = (event) => {
  event.preventDefault();
  if (!selectedValues[question.id]) {
     alert('Пожалуйста, выберите ответ на вопрос.');
     return; 
  }

  const currentAnswer = selectedValues[question.id];

  const previousAnswers = JSON.parse(sessionStorage.getItem('answers')) || {};

  const updatedAnswers = {
       ...previousAnswers,
       [`${question.id}`]: currentAnswer
  };

  sessionStorage.setItem('answers', JSON.stringify(updatedAnswers));

  onNextQuestion();
 };

 return (
    <QuestionFormContainer onSubmit={handleSubmit}>
      <QuestionTitle>{question.question}</QuestionTitle>
      <OptionsContainer>
        {["+4", "+3", "+2", "+1", "0", "-1", "-2", "-3", "-4"].map((value) => (
          <OptionContainer key={value}>
            <OptionInput
              type="radio"
              id={`option-${value}`}
              name="option"
              value={value}
              checked={selectedValues[question.id] === value}
              onChange={handleChange}
            />
            <OptionLabel htmlFor={`option-${value}`}>{value}</OptionLabel>
          </OptionContainer>
        ))}
      </OptionsContainer>
      <BaseButton type="submit">Далее</BaseButton>
    </QuestionFormContainer>
 );
}

export default QuestionForm;