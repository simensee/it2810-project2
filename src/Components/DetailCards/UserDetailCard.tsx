import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../Resources/DataContext';
import { Commit, User } from '../../Resources/ResponseTypes';


type UserDetailCardProps = {
    focusUser: User;
}

const UserDetailCard = ({ focusUser }: UserDetailCardProps) => {

    const ctx = useContext(DataContext);
    const [userCommits, setUserCommits] = useState(0);

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

    const totalCommits: number = GetUserTotalCommits(focusUser)

    return (
        <div className='flex items-center flex-col gap-4 pt-6 bg-elem-bg h-full'>
            <div className='flex flex-col gap-4'>
                <img src={focusUser.avatar_url} alt="img not found" className='w-52 h-52 rounded-full' />
                <div className='flex flex-col items-center'>
                    <span>{focusUser.name}</span>
                    <span>@{focusUser.username}</span>

                </div>
            </div>
            <div className='flex flex-col'>
                <span>{totalCommits}</span>
            </div>
        </div>
    )
}

export default UserDetailCard