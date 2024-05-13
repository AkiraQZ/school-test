import { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import BaseButton from './components/BaseButton';
import StyledHeaderComponent from './components/Header';
import StyledTeacherPage from './TeacherPage';
import StudentsPage from './StudentPage';
import axios from 'axios';
import { log } from 'react-modal/lib/helpers/ariaAppHider';
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
  const [getedObject, setGetedObject] = useState([]);

  async function codeCheck(input) {
    try {
        setGetedObject('');
        setIsLoading(true);
        let response = await axios.get("http://localhost:5550/teacher");
        let data = response.data;
        let foundUser = data.find((item) => item.code == input);
        if (!foundUser) {
            response = await axios.get("http://localhost:5550/student");
            data = response.data;
            foundUser = data.find((item) => item.code == input);
            setGetedObject(foundUser);
        } else {
            setGetedObject(foundUser);
        }
        if (getedObject) {
            setIsLoading(false);
            return getedObject.role;
        } else {
            alert('Данного пользователя не существует');
            setIsLoading(false);
            return false;
        }
    } catch (err) {
        console.error(err);
        alert('Произошла ошибка при выполнении запроса');
        setIsLoading(false);
        setGetedObject([]);
        return false;
    }
}

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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSend = async () => {
    event.preventDefault();
    const role = await codeCheck(inputValue);
    if (role) {
      setRecRole(role);
    }
  };

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
