import React, { createContext, ReactNode } from 'react'
import { User } from './ResponseTypes';

interface DataContextProps {
    usersData: User[],
    fetchUsers: Function,
}

export const DataContext = createContext<DataContextProps>({
    usersData: [],
    fetchUsers: () => null
});

export interface LayoutProps {
    children: ReactNode,
}

export const DataContextProvider = (props: LayoutProps) => {
    const stringUrl: string = 'https://gitlab.stud.idi.ntnu.no/api/v4/projects/17475/';
    const APIToken: string = 'glpat-cygbLETJKv1wXaNyMtXS';

    let usersData: User[] = [];

    const fetchUsers = async () => {
        const usersUrl = stringUrl.concat('users');
        let fetchUsersUrl: URL = new URL(usersUrl);

        await fetch(fetchUsersUrl, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + APIToken,
            })
        })
            .then(res => res.json())
            .then((res) => {
                const userResponse: User[] = res;
                usersData.push(...userResponse);
            });
    }

    const value: DataContextProps = {
        usersData,
        fetchUsers,
    };

    return <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
}
