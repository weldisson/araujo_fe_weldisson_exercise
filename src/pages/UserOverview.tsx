import React from 'react';
import {useLocation} from 'react-router-dom';
import {UserData} from 'types';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';

const mapUser = (user: UserData) => {
    const columns = [
        {
            key: 'Name',
            value: `${user.firstName} ${user.lastName}`,
        },
        {
            key: 'Display Name',
            value: user.displayName,
        },
        {
            key: 'Location',
            value: user.location,
        },
    ];
    return {columns, user};
};

const UserOverview = () => {
    const location = useLocation();
    const {columns, user} = mapUser(location.state);
    return (
        <Container>
            <Header title="MyTeam" showSearch={false} />
            <h2>
                User {location.state.firstName} {location.state.lastName}
            </h2>
            <Card columns={columns} hasNavigation={false} navigationProps={user} />
        </Container>
    );
};

export default UserOverview;
