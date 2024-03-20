import React, {useState, useEffect} from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ListItem, UserData} from 'types';
import {getTeamOverview, getUserData} from '../api';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';
import Search from '../components/Search';

const mapTeamMembers = (users: UserData[]) => {
    if (!users) {
        return [];
    }
    return users.map((user: UserData) => {
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
        return {
            id: user.id,
            url: `/user/${user.id}`,
            columns,
            navigationProps: user,
        };
    }) as ListItem[];
};

const mapTeamLead = (teamLead: UserData): ListItem => {
    const columns = [
        {
            key: 'Team Lead',
            value: '',
        },
        {
            key: 'Name',
            value: `${teamLead.firstName} ${teamLead.lastName}`,
        },
        {
            key: 'Display Name',
            value: teamLead.displayName,
        },
        {
            key: 'Location',
            value: teamLead.location,
        },
    ];
    return {columns, id: teamLead.id, teamLead};
};

const TeamOverview = () => {
    const location = useLocation();
    const {teamId} = useParams();
    const [teamLead, setTeamLead] = useState<ListItem>();
    const [teamMembers, setTeamMembers] = useState<any>();
    const [originalTeamMembers, setOriginalTeamMembers] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const getTeamUsers = async () => {
            try {
                const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
                const userData = await getUserData(teamLeadId);

                const memberPromises = teamMemberIds.map(async teamMemberId => {
                    return getUserData(teamMemberId);
                });
                const membersData = await Promise.all(memberPromises);

                const mappedTeamLead = mapTeamLead(userData);
                const mappedTeamMembers = mapTeamMembers(membersData);
                if (mappedTeamMembers.length === 0) {
                    setIsLoading(false);
                    return;
                }
                setTeamLead(mappedTeamLead);
                setTeamMembers(mappedTeamMembers);
                setOriginalTeamMembers(mappedTeamMembers);
            } catch (error) {
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };
        getTeamUsers();
    }, [teamId]);

    const onSearchHandler = (searchTerm: string) => {
        if (searchTerm === '') {
            setTeamMembers(originalTeamMembers);
            return;
        }
        const findTerm = teamMembers.filter((team: ListItem) =>
            team.columns[0].value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTeamMembers(findTerm);
    };

    return (
        <Container>
            <Header title="MyTeam" onSearch={onSearchHandler} />
            <h2>Team {location.state.name}</h2>
            <Search onSearch={onSearchHandler} isLoading={isLoading} />
            {!isLoading && teamLead && (
                <Card
                    columns={teamLead.columns}
                    url={`/user/${teamLead.id}`}
                    navigationProps={teamLead.teamLead}
                />
            )}
            <List items={teamMembers} isLoading={isLoading} />
        </Container>
    );
};

export default TeamOverview;
