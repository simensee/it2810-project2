import React from 'react'
import { MergeRequest } from '../../Resources/ResponseTypes'

type MergeRQDetailsProps = {
    merge: MergeRequest;
}

const MergeRQDetails = ({ merge }: MergeRQDetailsProps) => {
    return (
        <>
            {(merge.title !== 'empty') ?
                <div className='col-span-1 w-full flex flex-col gap-2 p-4 bg-stone-100 rounded-md'>
                    <span className='text-2xl pb-3'>{merge.source_branch}</span>
                    <div className='w-full grid grid-cols-3 gap-1'>
                        <span className='w-full col-span-1'>Merged: </span>
                        <span className='w-full col-span-2 text-black/40'>{merge.merged_at?.split('T')[0]}</span>
                    </div>
                    <div className='w-full grid grid-cols-3 gap-1'>
                        <span className='col-span-1'>Target:</span>
                        <span className='col-span-2'>{merge.target_branch}</span>
                    </div>
                    <div className='w-full grid grid-cols-3 gap-1'>
                        <span className='w-full col-span-1'>Author: </span>
                        <span className='w-full col-span-2'>{merge.author?.name}</span>
                    </div>
                    <div className='w-full grid grid-cols-3 gap-1'>
                        <span className='w-full col-span-1'>Decription: </span>
                        <div className='w-full col-span-2 flex flex-col gap-2'>
                            <span>{merge.title}</span>
                            <span className='text-black/40'>{merge.description ?? ''}</span>
                        </div>
                    </div>
                    <div className='w-full grid grid-cols-3 gap-1'>
                        <span className='col-span-1'>Assignees:</span>
                        {(merge.assignees?.length !== 0) ?
                            <div className='col-span-2'>
                                {merge.assignees?.map(u => {
                                    return <span>{u.username}</span>
                                })}
                            </div>
                            : <span>Ingen</span>
                        }
                    </div>
                </div>
                : <div className='w-full col-span-1'>Ingen merge-request valgt</div>
            }
        </>
    )
}

export default MergeRQDetails