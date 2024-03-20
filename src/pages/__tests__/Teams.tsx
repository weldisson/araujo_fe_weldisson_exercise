import * as React from 'react';
import {fireEvent, render, screen, waitFor, act} from '@testing-library/react';
import * as API from '../../api';
import Teams from '../Teams';

jest.mock('react-router-dom', () => ({
    useLocation: () => ({
        state: {
            firstName: 'Test',
            lastName: 'User',
            displayName: 'userName',
            location: 'location',
        },
    }),
    useNavigate: () => ({}),
}));

describe('Teams', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render spinner while loading', async () => {
        const mockTeamsData = [
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ];

        jest.spyOn(API, 'getTeams').mockImplementation(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(mockTeamsData);
                }, 1000);
            });
        });

        render(<Teams />);

        expect(screen.getByTestId('spinner')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(1000);
        });

        await waitFor(() => {
            expect(screen.queryByTestId('spinner')).toBeNull();
        });
    });

    it('should render teams list', async () => {
        jest.spyOn(API, 'getTeams').mockResolvedValue([
            {
                id: '1',
                name: 'Team1',
            },
            {
                id: '2',
                name: 'Team2',
            },
        ]);

        render(<Teams />);

        await waitFor(() => {
            expect(screen.getByText('Team1')).toBeInTheDocument();
        });
        expect(screen.getByText('Team2')).toBeInTheDocument();
        expect(screen.getByTestId('search-form')).toBeInTheDocument();
    });
});
