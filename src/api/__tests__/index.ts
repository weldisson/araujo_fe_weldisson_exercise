import * as API from '../index';

describe('API functions', () => {
    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({}),
            })
        ) as jest.Mock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch teams data', async () => {
        const teamsData = [
            {id: '1', name: 'Team 1'},
            {id: '2', name: 'Team 2'},
        ];
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(teamsData),
            })
        ) as jest.Mock;

        const teams = await API.getTeams();

        expect(teams).toEqual(teamsData);
        expect(global.fetch).toHaveBeenCalledWith(`${process.env.REACT_APP_API_BASE_URL}/teams`);
    });

    it('should fetch team overview data', async () => {
        const teamId = '1';
        const teamOverviewData = {id: '1', teamLeadId: '2', teamMemberIds: ['3', '4']};
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(teamOverviewData),
            })
        ) as jest.Mock;

        const teamOverview = await API.getTeamOverview(teamId);

        expect(teamOverview).toEqual(teamOverviewData);
        expect(global.fetch).toHaveBeenCalledWith(
            `${process.env.REACT_APP_API_BASE_URL}/teams/${teamId}`
        );
    });

    it('should fetch user data', async () => {
        const userId = '1';
        const userData = {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            displayName: 'JohnD',
            location: 'USA',
        };
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(userData),
            })
        ) as jest.Mock;
        const user = await API.getUserData(userId);

        expect(user).toEqual(userData);
        expect(global.fetch).toHaveBeenCalledWith(
            `${process.env.REACT_APP_API_BASE_URL}/users/${userId}`
        );
    });

    it('should throw error when unable to fetch data', async () => {
        const errorMessage = 'Failed to fetch';
        global.fetch = jest.fn(() =>
            Promise.reject({
                json: () => Promise.reject(errorMessage),
            })
        ) as jest.Mock;

        await expect(API.getTeams()).rejects.toThrow('Unable to find data, try again');
        await expect(API.getTeamOverview('1')).rejects.toThrow('Unable to find data, try again');
        await expect(API.getUserData('1')).rejects.toThrow('Unable to find data, try again');
    });
});
