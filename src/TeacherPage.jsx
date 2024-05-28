import { Fragment, useState } from "react"
import styled from "styled-components"
import axios from "axios"
import StyledHeaderComponent from "./components/Header"
import BaseButton from "./components/BaseButton"
import FooterComponent from "./components/Footer"

const StyledSection = styled.section`
display: flex; 
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
height: 100vh;
`
const StyledFileInput = styled.input`
  &[type="file"] {
    display: none;
  }
`;

const StyledFileLabel = styled.label`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-bottom: 2rem;
`;



export default function TeacherPage () {
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    async function handleResults() {
        setIsLoading(true);
        const userId = sessionStorage.getItem('userId');
        const response = await axios.get(`http://localhost:5550/upload/results?userId=${userId}`, {
          responseType: 'Blob',
        })
        const url = window.URL.createObjectURL(new Blob([response.data]));

        // Создаем элемент <a> для скачивания файла
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${userId}.xlsx`); // Имя файла для скачивания, измените на нужное
        document.body.appendChild(link);
    
        // Программный клик по элементу <a>, что приведет к началу скачивания
        link.click();
    
        // Удаляем элемент <a> из DOM после скачивания
        document.body.removeChild(link);
        setIsLoading(false);
    }
    
    async function handleUpload() {
      try {
        setIsLoading(true);
        const formData = new FormData();
        const userId = sessionStorage.getItem('userId');
        formData.append('userId', userId);
        formData.append('myFile', file);
    
        // Загрузка файла на сервер
        await axios.post(`http://localhost:5550/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
    
        // Ожидание завершения обработки файла на сервере
        setTimeout(async () => {
          // Получение кодов после загрузки файла
          const getCodesResponse = await axios.get(`http://localhost:5550/upload/codes?userId=${userId}`, {
            responseType: 'blob',
          });
    
          if (getCodesResponse.status === 200) {
            const url = window.URL.createObjectURL(new Blob([getCodesResponse.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${userId}.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            console.error("Ошибка при получении кодов:", getCodesResponse.statusText);
          }
        }, 5000); // Задержка в 5 секунд перед запросом на скачивание кодов
    
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Ошибка при загрузке файла:", error);
        alert("Произошла ошибка при загрузке файла. Возможно вы пытаетесь загрузить файл не того разрешения");
      }
    }

      return (
        <Fragment>
          {isLoading ? (
            <div>Loading...</div> // Можно заменить на индикатор загрузки
          ) : (
            <Fragment>
              <StyledHeaderComponent>Страница учителя</StyledHeaderComponent>
              <StyledSection>
                <h2>Загрузите таблицу в формате .xlsx</h2>
                <StyledFileInput
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                />
                <StyledFileLabel htmlFor="fileInput">
                  Выберите файл
                </StyledFileLabel>
                <BaseButton onClick={handleUpload}>Загрузить</BaseButton>
                <BaseButton onClick={handleResults}>Скачать результаты</BaseButton>
              </StyledSection>
              <FooterComponent/>
            </Fragment>
          )}
        </Fragment>
      );
      
      
}