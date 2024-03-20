import styled from 'styled-components';

export const HeaderContainer = styled.div`
    background-color: #ffffff;
    display: flex;
    align-items: left;
    justify-content: center;
    padding: 10px 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    position: fixed;
    top: 0;
`;

export const NavigationHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const BackButton = styled.button`
    font-size: 0px;
    padding: 0;
    cursor: pointer;
    border: none;
    background: transparent;
`;

export const Title = styled.h2`
    font-size: 20px;
    margin: 0;
    font-weight: bold;
    font-family: 'Product Sans', sans-serif;
`;
