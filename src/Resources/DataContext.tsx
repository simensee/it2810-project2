import React, { createContext, useState, ReactNode } from 'react'
import { Commit, User, MergeRequest, Issue, LabelColor, Branch } from './ResponseTypes';


interface DataContextProps {
    usersData: User[],
    commitData: Commit[],
    branchesData: Branch[],
    mergeData: MergeRequest[],
    issueData: Issue[],
    labelColors: LabelColor[],
    setCredentials: Function,
    fetchUsers: Function,
    fetchCommits: Function,
    fetchBranches: Function,
    fetchMergeRequests: Function,
    fetchIssues: Function,
    fetchLabelColors: Function,
    getUserTotalCommits: Function,
    setup: Function,
    clearParams: Function,
}

export const DataContext = createContext<DataContextProps>({
    usersData: [],
    commitData: [],
    branchesData: [],
    mergeData: [],
    issueData: [],
    labelColors: [],
    setCredentials: () => null,
    fetchUsers: () => null,
    fetchCommits: () => null,
    fetchBranches: () => null,
    fetchMergeRequests: () => null,
    fetchIssues: () => null,
    fetchLabelColors: () => Promise<LabelColor[]>,
    getUserTotalCommits: (u: User) => Number,
    setup: () => null,
    clearParams: () => null,
});

export interface LayoutProps {
    children: ReactNode,
}

export const DataContextProvider = (props: LayoutProps) => {
    let baseUrl: string = 'https://gitlab.stud.idi.ntnu.no/api/v4/projects/';

    let APIToken: string[] = [];
    let repoId: string[] = [];

    let usersData: User[] = [];
    let commitData: Commit[] = [];
    let branchesData: Branch[] = [];
    let mergeData: MergeRequest[] = [];
    let issueData: Issue[] = [];
    let labelColors: LabelColor[] = [];


    const setup = async () => {
        if (localStorage.getItem('isAuth') === 'true') {
            if (APIToken.length === 0) APIToken.push(localStorage.getItem('repoToken')!);
            if (repoId.length === 0) repoId.push(localStorage.getItem('repoId')!);
        }
    }

    const setCredentials = async (id: string, token: string) => {
        APIToken.push(token);
        repoId.push(id);
    }

    const clearParams = () => {
        localStorage.setItem('repoId', '');
        localStorage.setItem('repoToken', '');
        APIToken.pop();
        repoId.pop();
    }

    let currentPage = 0;
    const fetchUsers = async () => {
        const usersUrl = baseUrl.concat((repoId[0] ?? '') + '/users');
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
        const commitUrl = baseUrl.concat((repoId[0] ?? '') + '/repository/commits');
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
                const commitResponse: Commit[] = res;
                commitData.push(...commitResponse);
                page++;
            });
        }
    }

    const fetchBranches = async () => {
        const branchUrl = baseUrl.concat((repoId[0] ?? '') + '/repository/branches')
        let fetchBranchUrl: URL = new URL(branchUrl)
        await fetch(fetchBranchUrl, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json', //tell fetch that you sending in a json
                'Authorization': 'Bearer ' + APIToken,
            })
        }).then(res => res.json()).then((res) => {
            const branchResponse: Branch[] = res;
            branchesData.push(...branchResponse);
        });

    }
    
    const fetchMergeRequests = async () => {
        const mergeUrl = baseUrl.concat((repoId[0] ?? '') + '/merge_requests');
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
                const mergeResponse: MergeRequest[] = res;
                mergeData.push(...mergeResponse);
                page++;
            });
        }
    }

    const fetchMergeRequestsFiltered = async (start_time: string, end_time: string, username: string) => {
        const mergeUrl = baseUrl.concat((repoId[0] ?? '') + '/merge_requests');
        let fetchMergeUrl: URL = new URL(mergeUrl + "?pagination=keyset&since=" + start_time + "&until" + end_time + "&author_username=" + username);
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
                const mergeResponse: MergeRequest[] = res;
                mergeData.push(...mergeResponse);
                page++;
            });
        }
    }

    const fetchIssues = async () => {
        const issueUrl = baseUrl.concat((repoId[0] ?? '') + '/issues');
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
                const issueResponse: Issue[] = res;
                issueData.push(...issueResponse);
                page++;
            });
        }
    }

    const fetchIssuesFiltered = async (start_time: string, end_time: string, username: string) => {
        const issueUrl = baseUrl.concat((repoId[0] ?? '') + '/issues');
        let fetchIssueUrl: URL = new URL(issueUrl + "?pagination=keyset&since=" + start_time + "&until" + end_time + "&assignees_username=" + username);
        let page: number = 1;
        let finished: boolean = false;
        while (!finished) {
            await fetch(fetchIssueUrl + "&page=" + page, {

            }).then(res => res.json()).then((res) => {
                if (res.length < 20) finished = true;
                const issueResponse: Issue[] = res;
                issueData.push(...issueResponse);
                page++;
            });
        }
    }

    const fetchLabelColors = async () => {
        const labelUrl = baseUrl.concat((repoId[0] ?? '') + '/labels');
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

    function getUserTotalCommits(user: User): number {
        const resp: Commit[] | Commit = commitData;
        let n: number = 0;
        for (let i = 0; i < resp.length; i++) {
            if (user.username === resp[i].author_name || user.username === resp[i].author_email?.split('@')[0]) {
                n += 1
            }
        }
        return n;
    }

    const value: DataContextProps = {
        usersData,
        commitData,
        branchesData,
        mergeData,
        issueData,
        labelColors,
        setCredentials,
        fetchUsers,
        fetchCommits,
        fetchBranches,
        fetchMergeRequests,
        fetchIssues,
        fetchLabelColors,
        getUserTotalCommits,
        setup,
        clearParams,
    };

    return <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
}

