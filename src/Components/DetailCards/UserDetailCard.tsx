import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../Resources/DataContext';
import { Commit, Issue, User } from '../../Resources/ResponseTypes';


type UserDetailCardProps = {
    focusUser: User;
}

const UserDetailCard = ({ focusUser }: UserDetailCardProps) => {

    const ctx = useContext(DataContext);

    function GetUserTotalCommits(user: User): number {
        const resp: Commit[] | Commit = ctx.commitData;
        let n: number = 0;
        for (let i = 0; i < resp.length; i++) {
            if (user.username === resp[i].author_name) {
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


    function isBot(name: string): boolean {
        return name[0] === '*';
    }

    const totalCommits: number = GetUserTotalCommits(focusUser)
    const totalIssues: number = GetUserTotalIssuesAssigned(focusUser)
    

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
                        <span>Total commits: {totalCommits}</span>
                        <span>Total issues assigned: {totalIssues}</span>

                    </div>
                </>
            }
        </div>
    )
}

export default UserDetailCard