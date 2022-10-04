import React from 'react'
import { Commit } from '../../Resources/ResponseTypes'

type CommitListDetailsProps = {
    commit: Commit;
}

const CommitListDetails = ({ commit }: CommitListDetailsProps) => {
    return (
        <>
            {(commit.title !== 'empty') ?
                <div className='col-span-1 w-full flex flex-col gap-2 p-4 bg-stone-100 rounded-md'>
                    <span className='text-2xl pb-3'>{commit.title}</span>
                    <div className='w-full flex flex-col lg:grid lg:grid-cols-3 lg:gap-1'>
                        <span className='w-full lg:col-span-1'>commited: </span>
                        <span className='w-full lg:col-span-2 text-black/40'>{commit.committed_date?.split('T')[0]}</span>
                    </div>
                    <div className='w-full flex flex-col lg:grid lg:grid-cols-3 lg:gap-1'>
                        <span className='w-full lg:col-span-1'>Author: </span>
                        <span className='w-full lg:col-span-2'>{commit.author_name}</span>
                    </div>
                    <div className='w-full flex flex-col lg:grid lg:grid-cols-3 lg:gap-1'>
                        <span className='lg:col-span-1'>Committer:</span>
                        <span className='lg:col-span-2'>{commit.committer_name}</span>
                    </div>
                    <div className='w-full flex flex-col lg:grid lg:grid-cols-3 lg:gap-1'>
                        <span className='w-full lg:col-span-1'>Message: </span>
                        <span className='w-full lg:col-span-2 text-black/40'>{commit.message}</span>
                    </div>
                </div>
                : <div className='w-full col-span-1'>Ingen commit valgt</div>
            }
        </>
    )
}

export default CommitListDetails