export interface Teams {
    id: string;
    name: string;
}

export interface TeamOverview {
    id: string;
    teamLeadId: string;
    teamMemberIds: string[];
}

export interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    location: string;
    avatar: string;
}

export interface ListItemColumn {
    key: string;
    value: string;
}

export interface ListItem {
    id: string;
    url?: string;
    teamLead?: UserData;
    columns: Array<ListItemColumn>;
    navigationProps?: UserData | Teams;
}

export interface HeaderProps {
    title: string;
    enableBackButton?: boolean;
    showSearch?: boolean;
    onSearch?: (searchTerm: string) => void;
}

export interface ListProps {
    items?: ListItem[];
    hasNavigation?: boolean;
    isLoading: boolean;
}
export interface CardProps {
    id?: string;
    url?: string;
    columns: ListItemColumn[];
    hasNavigation?: boolean;
    navigationProps?: UserData | Teams;
}

export interface SearchProps {
    onSearch: (searchTerm: string) => void;
    isLoading: boolean;
}