import React from 'react';
import {ListProps} from 'types';
import Card from '../Card';
import {Spinner} from '../Spinner';
import {Container} from './styles';

const List: React.FC<ListProps> = ({items, hasNavigation = true, isLoading}: ListProps) => {
    return (
        <Container>
            {isLoading && <Spinner />}
            {!isLoading &&
                items.map(({url, id, columns, navigationProps}, index) => {
                    return (
                        <Card
                            key={`${id}-${index}`}
                            id={id}
                            columns={columns}
                            navigationProps={navigationProps}
                            hasNavigation={hasNavigation}
                            url={url}
                        />
                    );
                })}
        </Container>
    );
};

export default List;
