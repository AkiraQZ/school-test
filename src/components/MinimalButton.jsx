import styled from 'styled-components';

const StyledMinimalButton = styled.button`
display: inline-block;
padding: 0;
margin: 0;
border: none;
border-radius: 0;
background-color: transparent;
color: #333;
font-size: 1em;
font-weight: bold;
text-align: center;
text-decoration: none;
cursor: pointer;
transition: text-decoration 0.3s ease;
&:hover {
    text-decoration: underline;
}
&:focus {
    outline: none;
    box-shadow: none;
}
`


export default function MinimalButton ({children, onClick}) {
    return (
        <StyledMinimalButton onClick={onClick}>{children}</StyledMinimalButton>
    )
}