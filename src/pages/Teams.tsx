import React, {useState, useEffect} from 'react';
import {ListItem, Teams as TeamsList} from 'types';
import {getTeams as fetchTeams} from '../api';
import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';
import Search from '../components/Search';

const mapTeams = (teams: TeamsList[]) => {
    return teams.map((team: TeamsList) => {
        const columns = [
            {
                key: 'Name',
                value: team.name,
            },
        ];
        return {
            id: team.id,
            url: `/team/${team.id}`,
            columns,
            navigationProps: team,
        } as ListItem;
    });
};

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [originalTeams, setOriginalTeams] = useState([]);

    useEffect(() => {
        const getTeams = async () => {
            const response = await fetchTeams();
            const mappedTeams = mapTeams(response);
            setTeams(mappedTeams);
            setOriginalTeams(mappedTeams);
            setIsLoading(false);
        };
        getTeams();
    }, []);

    const onSearchHandler = (searchTerm: string) => {
        if (searchTerm === '') {
            setTeams(originalTeams);
            return;
        }
        const findTerm = teams.filter((team: ListItem) =>
            team.columns[0].value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setTeams(findTerm);
    };

    return (
        <Container>
            <Header title="MyTeam" enableBackButton={false} onSearch={onSearchHandler} />
            <h2>Teams</h2>
            <Search onSearch={onSearchHandler} isLoading={isLoading} />
            <List items={teams} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
