import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../Resources/DataContext';
import { Commit, Issue, MergeRequest, User } from '../../Resources/ResponseTypes';


type UserDetailCardProps = {
    focusUser: User;
}

const UserDetailCard = ({ focusUser }: UserDetailCardProps) => {

    const ctx = useContext(DataContext);
    const [finished, setFinished] = useState(false);
    useEffect(() => {
        GetUsersLastThreeCommits(focusUser, ctx.commitData);
        
    }, []);
    
    let userCommits: Commit[] = [];

    function GetUserTotalCommits(user: User): number {
        const resp: Commit[] | Commit = ctx.commitData;
        let n: number = 0;
        for (let i = 0; i < resp.length; i++) {
            if (user.username === resp[i].author_name || user.username === resp[i].author_email?.split('@')[0]) {
                n += 1
            }
        }
        return n;
    }

    function GetUserTotalIssuesAssigned(user: User): number {
        const resp: Issue[] | Issue = ctx.issueData;
        let n: number = 0;
        for (let i = 0; i < resp.length; i++) {
            if (user.username === resp[i].assignee?.username) {
                n += 1
            }
        }
        return n;
    }

    function GetUserTotalMergeRequestsOpened(user: User): number {
        const resp: MergeRequest[] | MergeRequest = ctx.mergeData;
        let n: number = 0;
        for (let i = 0; i < resp.length; i++) {
            if (user.username === resp[i].merged_by?.username) {
                n += 1
            }
        }
        return n;
    }
    
    function GetUsersLastThreeCommits(user: User, commitData: Commit[]) {
        userCommits = [];
        let i : number = 0;
        const commits: Commit[] = [];
        commitData.map((commit) => {
            console.log(commit)
            if (i > 2) {
                return;
            }
            if (commit.author_email?.split('@')[0] === user.username || commit.author_name === user.username) {
                commits.push(commit);
                console.log(i);
                i++;
                
            }
        })
        /*for (let i = 0; i < commitData.length; i++) {
            console.log(commitData[i]);
            if (user.username === commitData[i].author_name) {
                commits.push(ctx.commitData[i]);
                
            }
        }*/
        console.log("Commits");
        console.log(commits);
        userCommits.push(...commits);
        console.log(userCommits);
    }


    function isBot(name: string): boolean {
        return name[0] === '*';
    }

    const totalCommits: number = GetUserTotalCommits(focusUser);
    const totalIssues: number = GetUserTotalIssuesAssigned(focusUser);
    const totalMerges: number = GetUserTotalMergeRequestsOpened(focusUser);
    GetUsersLastThreeCommits(focusUser, ctx.commitData);
        return (
            <div className='flex items-center flex-col gap-4 py-10 bg-elem-bg rounded-md'>
                {(focusUser.name === 'Empty') ?
                    <div className='flex justify-center items-center'>Ingen bruker valgt</div>
                    :
                    <>
                        <div className='flex flex-col gap-4 items-center'>
                            <img src={focusUser.avatar_url} alt="img not found" className='w-52 h-52 rounded-full' />
                            <div className='h-30 flex flex-col items-center  p-2 overflow-auto'>
                                <span className='text-center text-2xl overflow-wrap'>{(isBot(focusUser.name) ? 'Project bot' : focusUser.name)}</span>
                                <span>@{focusUser.username}</span>

                            </div>
                        </div>

                        <div className='flex flex-col items-center'>
                            {}
                            <span>Total commits: {totalCommits}</span>
                            <span>Total issues assigned: {totalIssues}</span>
                            <p>---------------------------------------------</p>
                            <span>Total merge requests closed: {totalMerges}</span>
                            <p className='font-bold p-2'>Latest commits:</p>
                            <div className='flex flex-col gap-4 p-4 bg-red-100 w-11/12'>
                                {userCommits.map((c, i) => {
                                    return (<div key={i} className='flex flex-col'>
                                        {/* <span className='italic'>{c.author_name}</span> */}
                                        <span>{c.title}</span>
                                </div>
                                )})}
                            </div>
                        </div>
                    </>
                }
            </div>
        )
        
    }



export default UserDetailCard;