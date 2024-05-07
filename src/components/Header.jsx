import styled from 'styled-components';

const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #666;
    color: white;
    padding: 10px;
    h1  {
        margin: 0;
        font-size: 1rem;
    }
`

export default function StyledHeaderComponent ({children}) {
    return (
    <StyledHeader>
        <h1>{children}</h1>
        </StyledHeader>
    )
} 