import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import Search from '..';

describe('Search', () => {
    it('should render the input when isLoading is false', () => {
        const onSearchMock = jest.fn();
        render(<Search onSearch={onSearchMock} isLoading={false} />);

        expect(screen.getByTestId('search-form')).toBeInTheDocument();
    });

    it('should update the search term when user types', () => {
        const onSearchMock = jest.fn();
        render(<Search onSearch={onSearchMock} isLoading={false} />);

        const input = screen.getByPlaceholderText(
            'Type and press enter to search'
        ) as HTMLInputElement;
        fireEvent.change(input, {target: {value: 'test search'}});

        expect(input.value).toBe('test search');
    });

    it('should call onSearch when Enter key is pressed', () => {
        const onSearchMock = jest.fn();
        render(<Search onSearch={onSearchMock} isLoading={false} />);

        const input = screen.getByPlaceholderText('Type and press enter to search');
        fireEvent.change(input, {target: {value: 'test search'}});
        fireEvent.keyPress(input, {key: 'Enter', code: 'Enter', charCode: 13});

        expect(onSearchMock).toHaveBeenCalledWith('test search');
    });
});
