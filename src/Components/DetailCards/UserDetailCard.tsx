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
            if (user.username === resp[i].authorName) {
                n += 1
            }
        }
        return n;
    }


    function isBot(name: string): boolean {
        return name[0] === '*';
    }

    const totalCommits: number = GetUserTotalCommits(focusUser)

    return (
        <div className='flex items-center flex-col gap-4 pt-6 bg-elem-bg h-full'>
            <div className='flex flex-col gap-4 items-center'>
                <img src={focusUser.avatar_url} alt="img not found" className='w-52 h-52 rounded-full' />
                <div className='h-30 flex flex-col items-center  p-2 overflow-auto'>
                    <span className='text-center text-2xl overflow-wrap'>{( isBot(focusUser.name) ? 'Project bot' :focusUser.name)}</span>
                    <span>@{focusUser.username}</span>

                </div>
            </div>
            <div className='flex flex-col items-center'>
                <span>Total commits: {totalCommits}</span>
                <p className='p-4'>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                    eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
                    voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                </p>
            </div>
        </div>
    )
}

export default UserDetailCard