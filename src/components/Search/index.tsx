import React, {useState} from 'react';
import {SearchInput, SVGContainer} from './styles';
import {SearchProps} from 'types';

const Search: React.FC<SearchProps> = ({onSearch, isLoading}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSearch(searchTerm);
        }
    };

    return (
        !isLoading && (
            <form data-testid="search-form" onSubmit={event => event.preventDefault()}>
                <SearchInput
                    type="text"
                    placeholder="Type and press enter to search"
                    value={searchTerm}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
                <SVGContainer src="/search.svg" alt="Back" />
            </form>
        )
    );
};

export default Search;
