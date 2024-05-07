import styled from 'styled-components';

const StyledFooter = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #666;
    color: white;
    padding: 10px;
    width: 100%;
    a  {
        all: unset;
        cursor: pointer;
    }
    P {
        margin:0;
    }
`

export default function FooterComponent () {
    return (
    <StyledFooter>
        <a href='https://github.com/AkiraQZ'>Created by AkiraQZ</a>
        <p>2024</p>
        </StyledFooter>
    )
} 