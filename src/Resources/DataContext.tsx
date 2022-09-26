import React, { createContext, useState, ReactNode } from 'react'
import { Commit, User } from './ResponseTypes';


interface DataContextProps {
    usersData: User[],
    commitData: Commit[],
    fetchUsers: Function,
    fetchCommits: Function,
}

export const DataContext = createContext<DataContextProps>({
    usersData: [],
    commitData: [],
    fetchUsers: () => null,
    fetchCommits: () => null,
});

export interface LayoutProps {
    children: ReactNode,
}

export const DataContextProvider = (props: LayoutProps) => {
    const stringUrl: string = 'https://gitlab.stud.idi.ntnu.no/api/v4/projects/17475/';
    const APIToken: string = 'glpat-cygbLETJKv1wXaNyMtXS';

    let usersData: User[] = [];
    let commitData: Commit[] = [];

    const fetchUsers = async () => {
        const usersUrl = stringUrl.concat('users');
        let fetchUsersUrl: URL = new URL(usersUrl);

        await fetch(fetchUsersUrl, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + APIToken,
            })
        }).then(res => res.json()).then((res) => {
            const userResponse: User[] = res;
            usersData.push(...userResponse);
        });
    }

    const fetchCommits = async () => {
        const commitUrl = stringUrl.concat('repository/commits');
        let fetchCommitUrl: URL = new URL(commitUrl);

        await fetch(fetchCommitUrl, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + APIToken,
            })
        }).then(res => res.json()).then((res) => {
            const commitResponse: Commit[] = res;
            commitData.push(...commitResponse);
        });
    }

    

    const value: DataContextProps = {
        usersData,
        commitData,
        fetchUsers,
        fetchCommits,
    };

    return <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
}
