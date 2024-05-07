import styled from "styled-components";

const mainColor = 'white'

const StyledButton = styled.button`
display: inline-block;
padding: 10px 20px;
font-size: 16px;
font-weight: bold;
text-align: center;
text-decoration: none;
border: 1px solid #333;
border-radius: 5px;
color: ${mainColor};
background-color: #0080FF;
cursor: pointer;
&:hover {
    background-color: #66B2FF;
}
&.active {
    background-color: #66B2FF;
}
`

export default function BaseButton ({ children, onClick }) {
    return (
        <StyledButton onClick={onClick}>{children}</StyledButton>
    )
}