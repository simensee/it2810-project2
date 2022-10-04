import React, { createContext, useState, ReactNode } from 'react'
import { Commit, User, MergeRequest, Issue, LabelColor, Branch } from './ResponseTypes';


interface DataContextProps {
    usersData: User[],
    commitData: Commit[],
    branchesData: Branch[],
    mergeData: MergeRequest[],
    issueData: Issue[],
    labelColors: LabelColor[],
    isAuthorized: boolean,
    setIsAuthorized: Function,
    setCredentials: Function,
    fetchUsers: Function,
    fetchCommits: Function,
    fetchBranches: Function,
    fetchMergeRequests: Function,
    fetchIssues: Function,
    fetchLabelColors: Function,
    getUserTotalCommits: Function,
}

export const DataContext = createContext<DataContextProps>({
    usersData: [],
    commitData: [],
    branchesData: [],
    mergeData: [],
    issueData: [],
    labelColors: [],
    isAuthorized: false,
    setIsAuthorized: () => null,
    setCredentials: () => null,
    fetchUsers: () => null,
    fetchCommits: () => null,
    fetchBranches: () => null,
    fetchMergeRequests: () => null,
    fetchIssues: () => null,
    fetchLabelColors: () => Promise<LabelColor[]>,
    getUserTotalCommits: (u: User) => Number,
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
    let mergeData: MergeRequest[] = [];
    let issueData: Issue[] = [];
    let labelColors: LabelColor[] = [];

    // Login is set to true for easier development
    const [isAuthorized, setAuthorized] = useState(true);

    if (sessionStorage.getItem('isAuth') === 'true' && !isAuthorized) {
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

    const fetchMergeRequestsFiltered = async (start_time: string, end_time: string, username: string) => {
        const mergeUrl = baseUrl.concat('merge_requests');
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


    const fetchIssuesFiltered = async (start_time: string, end_time: string, username: string) => {
        const issueUrl = baseUrl.concat('issues');
        let fetchIssueUrl: URL = new URL(issueUrl + "?pagination=keyset&since=" + start_time + "&until" + end_time + "&assignees_username=" + username);
        let page: number = 1;
        let finished: boolean = false;
        while (!finished) {
            await fetch(fetchIssueUrl + "&page=" + page, {

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

    function getUserTotalCommits(user: User): number {
        const resp: Commit[] | Commit = commitData;
        let n: number = 0;
        for (let i = 0; i < resp.length; i++) {
            if (user.username === resp[i].author_name) {
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
        isAuthorized,
        setIsAuthorized,
        setCredentials,
        fetchUsers,
        fetchCommits,
        fetchBranches,
        fetchMergeRequests,
        fetchIssues,
        fetchLabelColors,
        getUserTotalCommits,
    };

    return <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
}

