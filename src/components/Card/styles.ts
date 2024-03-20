import styled from 'styled-components';

export const Container = styled.div<{hasNavigation: boolean}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 5px;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #ebf2fa;
    padding: 20px;
    width: 250px;
    max-height: 200px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    cursor: ${props => (props.hasNavigation ? 'pointer' : 'default')};
    margin: 15px;
    &:hover {
        border-color: #007bff;
    }
`;
