import styled from 'styled-components';

export const SearchInput = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    width: 300px;
    outline: none;
    margin-top: 40px;
    margin-bottom: 20px;
    &:focus {
        border-color: #007bff;
    }

`;

export const SVGContainer = styled.img`
    margin-left: -30px;
    width: 20px;
    transform: translateY(20%);
`;
