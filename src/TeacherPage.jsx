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




export default function TeacherPage () {
    const [file, setFile] = useState();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    async function handleUpload() {
        const formData = new FormData();
        formData.append("myfile", file);
        try {
          await axios.post("http://localhost:5500/upload", formData);
          alert("Файл загружен успешно!");
        } catch (error) {
          console.error("Ошибка при загрузке файла:", error);
          alert("Произошла ошибка при загрузке файла. Возможно вы пытаетесь загрузить файл не того разрешения");
        }
      }

    return (
        <Fragment>
            <StyledHeaderComponent>Страница учителя</StyledHeaderComponent>
            <StyledSection>
                <h2>Загрузите таблицу</h2>
                <input type = "file" onChange={handleFileChange} />
                <BaseButton onClick={handleUpload}>Загрузить</BaseButton>
            </StyledSection>
            <FooterComponent/>
        </Fragment>
    )
}