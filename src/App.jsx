import { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import BaseButton from './components/BaseButton';
import StyledHeaderComponent from './components/Header';
import StyledTeacherPage from './TeacherPage';
import StudentsPage from './StudentPage';
import axios from 'axios';
import FooterComponent from './components/Footer';

const Main = styled.section`
  display: flex;
  justify-content: center;
  padding-top: 25px;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const InputBox = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 2rem;
`;

export default function App() {
  const [recRole, setRecRole] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const savedRole = sessionStorage.getItem('recRole');
    if (savedRole) {
      setRecRole(savedRole);
    }
  }, []);

  useEffect(() => {
    if (recRole) {
      sessionStorage.setItem('recRole', recRole);
    }
  }, [recRole]);

  useEffect (() => {
    if (userId) {    
      sessionStorage.setItem('userId', userId )
    }
  }, [userId]);
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSend = async (event) => {
    event.preventDefault();
    await codeCheck(inputValue);
  };

  async function codeCheck(input) {
    try {
      setIsLoading(true);
      let response = await axios.get("http://school-test-api.containers.cloud.ru/teacher");
      let data = response.data;
      let foundUser = data.find((item) => item.code === input);
      if (!foundUser) {
        response = await axios.get("http://school-test-api.containers.cloud.ru/student");
        data = response.data;
        foundUser = data.find((item) => item.code === input);
        console.log(foundUser);
      }
      if (foundUser) {
        setRecRole(foundUser.role);
        setUserId(foundUser._id);
      }
      if (foundUser.role === 'student' && foundUser.results) {
        setIsLoading(false);
        alert("Вы не можете пройти тест дважды");
        setRecRole('');
        setUserId('');
      }
       else if (!foundUser){
        alert('Данного пользователя не существует');
        setRecRole('');
        setUserId('');
      }
    } catch (err) {
      console.error(err);
      alert('Произошла ошибка при выполнении запроса');
      setRecRole('');
      setUserId('');
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <Fragment>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {recRole === 'teacher' ? (
            <StyledTeacherPage />
          ) : recRole === 'student' ? (
            <StudentsPage />
          ) : (
            <Fragment>
              <StyledHeaderComponent>
                Стартовая страница
              </StyledHeaderComponent>
              <Main>
                <Form>
                  <label htmlFor='query'>Введите код</label>
                  <InputBox type="text" onChange={handleInputChange} placeholder='Ваш код' />
                  <BaseButton onClick={handleSend}>Отправить</BaseButton>
                </Form>
              </Main>
              <FooterComponent/>
            </Fragment>
          )}
        </>
      )}
    </Fragment>
  );
}
