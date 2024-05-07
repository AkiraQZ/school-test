import { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import BaseButton from './components/BaseButton';
import StyledHeaderComponent from './components/Header';
import StyledTeacherPage from './TeacherPage';
import StudentsPage from './StudentPage';
import FooterComponent from './components/Footer';

const keys = [
  {
    "id": 1,
    "unique_key": "abc123",
    "Name": "John Doe",
    "role": "student",
    "Class": "9A"
  },
  {
    "id": 2,
    "unique_key": "abc321",
    "Name": "John Koe",
    "role": 'teacher',
    "Class": "8B"
  },
];

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

  useEffect(() => {
    const savedRole = sessionStorage.getItem('recRole');
    if (savedRole) {
      setRecRole(savedRole);
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('recRole', recRole);
  }, [recRole]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSend = () => {
    const foundKey = keys.find(item => item.unique_key === inputValue);
    if (foundKey) {
      setRecRole(foundKey.role);
    } else {
      alert('Неверный код, попробуйте снова');
    }
  };

  return (
    <Fragment>
      {recRole === 'teacher' ? <StyledTeacherPage /> : recRole === 'student' ? <StudentsPage /> :
        <Fragment>
          <StyledHeaderComponent>
            Стартовая страница
          </StyledHeaderComponent>
          <Main>
            <Form>
              <label htmlFor='querry'>Введите код</label>
              <InputBox type="text" onChange={handleInputChange} placeholder='Ваш код' />
              <BaseButton onClick={handleSend}>Отправить</BaseButton>
            </Form>
          </Main>
          <FooterComponent/>
        </Fragment>
      }
    </Fragment>
  );
}

