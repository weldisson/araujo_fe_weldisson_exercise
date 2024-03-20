import React from 'react';
import {useNavigate} from 'react-router-dom';
import {HeaderProps} from 'types';
import {HeaderContainer, NavigationHeader, BackButton, Title} from './styles';

const Header: React.FC<HeaderProps> = ({title, enableBackButton = true}: HeaderProps) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(-1);
    };
    return (
        <HeaderContainer>
            <NavigationHeader>
                {enableBackButton ? (
                    <BackButton onClick={handleClick}>
                        <img src="/chevron-left.svg" alt="Back" />
                    </BackButton>
                ) : (
                    <BackButton onClick={handleClick} disabled>
                        <img src="/chevron-left-disabled.svg" alt="Back" />
                    </BackButton>
                )}
                <Title>{title}</Title>
            </NavigationHeader>
        </HeaderContainer>
    );
};

export default Header;
