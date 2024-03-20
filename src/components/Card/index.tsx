import React from 'react';
import {useNavigate} from 'react-router-dom';
import {CardProps} from 'types';
import {Container} from './styles';

const Card: React.FC<CardProps> = ({
    id,
    columns,
    url,
    hasNavigation = true,
    navigationProps = null,
}: CardProps) => {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        e.preventDefault();
        if (hasNavigation && url) {
            navigate(url, {
                state: navigationProps,
            });
        }
    };

    return (
        <Container
            data-testid={id ? `cardContainer-${id}` : 'cardContainer'}
            hasNavigation={hasNavigation}
            onClick={handleClick}
        >
            {columns.map(({key, value}) => (
                <p key={key}>
                    <strong>{key}</strong>&nbsp;{value}
                </p>
            ))}
        </Container>
    );
};

export default Card;
