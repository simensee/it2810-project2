import React, { createContext, useState, ReactNode } from 'react'
import { Commit, User, Branch } from './ResponseTypes';


interface DataContextProps {
    usersData: User[],
    commitData: Commit[],
    branchesData: Branch[],
    isAuthorized: boolean,
    setIsAuthorized: Function,
    setCredentials: Function,
    fetchUsers: Function,
    fetchCommits: Function,
    fetchBranches: Function,
}

export const DataContext = createContext<DataContextProps>({
    usersData: [],
    commitData: [],
    branchesData: [],
    isAuthorized: false,
    setIsAuthorized: () => null,
    setCredentials: () => null,
    fetchUsers: () => null,
    fetchCommits: () => null,
    fetchBranches: () => null,
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
    let branchesData: Branch[] = [];
    
    // Login is set to true for easier development
    const [isAuthorized, setAuthorized] = useState(true);

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

    let currentPage = 0; 
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
        let fetchCommitUrl: URL = new URL(commitUrl + "?pagination=keyset");
        let page: number = 1;
        let finished: boolean = false;
        while (!finished) {
        await fetch(fetchCommitUrl + "&page=" + page, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + APIToken,
            })
        }).then(res => res.json()).then((res) => {
            if (res.length < 20) finished = true;
            console.log(res.length);
            const commitResponse: Commit[] = res;
            commitData.push(...commitResponse);
            page++;
        });
        }
    }

    const fetchBranches = async () => {
        const branchUrl = baseUrl.concat('repository/branches')
        let fetchBranchUrl: URL = new URL(branchUrl)
        console.log(fetchBranchUrl)

        await fetch(fetchBranchUrl, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json', //tell fetch that you sending in a json
                'Authorization': 'Bearer ' + APIToken,
            })
        }).then(res => res.json()).then((res) => {
            const branchResponse: Branch[] = res;
            console.log("hei");
            branchesData.push(...branchResponse);
        });
        
    }

    const value: DataContextProps = {
        usersData,
        commitData,
        branchesData,
        isAuthorized,
        setIsAuthorized,
        setCredentials,
        fetchUsers,
        fetchCommits,
        fetchBranches,
    };

    return <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
}
