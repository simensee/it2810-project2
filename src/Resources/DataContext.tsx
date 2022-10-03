import React, { createContext, useState, ReactNode } from 'react'
import { Commit, User, MergeRequest, Issue, LabelColor } from './ResponseTypes';


interface DataContextProps {
    usersData: User[],
    commitData: Commit[],
    mergeData: MergeRequest[],
    issueData: Issue[],
    labelColors: LabelColor[],
    isAuthorized: boolean,
    setIsAuthorized: Function,
    setCredentials: Function,
    fetchUsers: Function,
    fetchCommits: Function,
    fetchMergeRequests: Function,
    fetchIssues: Function,
    fetchLabelColors: Function,
}

export const DataContext = createContext<DataContextProps>({
    usersData: [],
    commitData: [],
    mergeData: [],
    issueData: [],
    labelColors: [],
    isAuthorized: false,
    setIsAuthorized: () => null,
    setCredentials: () => null,
    fetchUsers: () => null,
    fetchCommits: () => null,
    fetchMergeRequests: () => null,
    fetchIssues: () => null,
    fetchLabelColors: () => Promise<LabelColor[]>,
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
    let mergeData: MergeRequest[] = [];
    let issueData: Issue[] = [];
    let labelColors: LabelColor[] = [];
    
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

    const fetchMergeRequests = async () => {
        const mergeUrl = baseUrl.concat('merge_requests');
        let fetchMergeUrl: URL = new URL(mergeUrl + "?pagination=keyset");
        let page: number = 1;
        let finished: boolean = false;
        while (!finished) {
        await fetch(fetchMergeUrl + "&page=" + page, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + APIToken,
            })
        }).then(res => res.json()).then((res) => {
            if (res.length < 20) finished = true;
            console.log(res.length);
            const mergeResponse: MergeRequest[] = res;
            mergeData.push(...mergeResponse);
            page++;
        });
        }
    }

    const fetchIssues = async () => {
        const issueUrl = baseUrl.concat('issues');
        let fetchIssueUrl: URL = new URL(issueUrl + "?pagination=keyset");
        let page: number = 1;
        let finished: boolean = false;
        while (!finished) {
        await fetch(fetchIssueUrl + "&page=" + page, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + APIToken,
            })
        }).then(res => res.json()).then((res) => {
            if (res.length < 20) finished = true;
            console.log(res.length);
            const issueResponse: Issue[] = res;
            issueData.push(...issueResponse);
            page++;
        });
        }
    }

    const fetchLabelColors = async () => {
        const labelUrl = baseUrl.concat('labels');
        let fetchLabelUrl: URL = new URL(labelUrl);
        await fetch(fetchLabelUrl, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + APIToken,
            })
        }).then((res) => res.json()).then((res) => {
            const tempColors: LabelColor[] = res;
            labelColors.push(...tempColors);
        });
    }

    const value: DataContextProps = {
        usersData,
        commitData,
        mergeData,
        issueData,
        labelColors,
        isAuthorized,
        setIsAuthorized,
        setCredentials,
        fetchUsers,
        fetchCommits,
        fetchMergeRequests,
        fetchIssues,
        fetchLabelColors,
    };

    return <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
}
