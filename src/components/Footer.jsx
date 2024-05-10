import styled from 'styled-components';

const StyledFooter = styled.footer`
    position:fixed;
    left:0px;
    bottom:0px;
    height:30px;
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #666;
    color: white;
    padding: 10px;
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
        <a href='#'>Обратная связь</a>
        </StyledFooter>
    )
} 