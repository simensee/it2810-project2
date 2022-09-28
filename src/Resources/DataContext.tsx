import React, { createContext, useState, ReactNode } from 'react'
import { Commit, User } from './ResponseTypes';


interface DataContextProps {
    usersData: User[],
    commitData: Commit[],
    isAuthorized: boolean,
    setIsAuthorized: Function,
    setCredentials: Function,
    fetchUsers: Function,
    fetchCommits: Function,
}

export const DataContext = createContext<DataContextProps>({
    usersData: [],
    commitData: [],
    isAuthorized: false,
    setIsAuthorized: () => null,
    setCredentials: () => null,
    fetchUsers: () => null,
    fetchCommits: () => null,
});

export interface LayoutProps {
    children: ReactNode,
}

export const DataContextProvider = (props: LayoutProps) => {
    const baseUrl: string = 'https://gitlab.stud.idi.ntnu.no/api/v4/projects/17475/';
    const APIToken: string = 'glpat-cygbLETJKv1wXaNyMtXS';

    let repoId: string = '';
    let ApiToken: string = '';
    
    let usersData: User[] = [];
    let commitData: Commit[] = [];
    
    const [isAuthorized, setAuthorized] = useState(false);

    if (sessionStorage.getItem('isAuth') === 'true' && !isAuthorized){
        setAuthorized(true);
    }

    const setCredentials = (id: string, token: string) => {
        repoId = id;
        ApiToken = token;
    }

    const setIsAuthorized = async (val: boolean) => {
        setAuthorized(val);
        sessionStorage.setItem('isAuth', val ? 'true' : 'false');
    }

    const fetchUsers = async () => {
        const usersUrl = baseUrl.concat('users');
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
        const commitUrl = baseUrl.concat('repository/commits');
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
        isAuthorized,
        setIsAuthorized,
        setCredentials,
        fetchUsers,
        fetchCommits,
    };

    return <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
}
