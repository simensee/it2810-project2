import React from 'react'
import { MergeRequest } from '../../Resources/ResponseTypes'

type MergeRQListTileProps = {
    merge: MergeRequest;
    handleClick: (m: MergeRequest) => void;
}

const MergeRQListTile = ({ merge, handleClick }: MergeRQListTileProps) => {
    return (
        <div 
        className='flex flex-col gap-1 py-1 px-2 bg-slate-200 hover:bg-slate-100 rounded-md'
        onClick={() => handleClick(merge)}>
            <span>{merge.source_branch}</span>
            <div className='flex flex-row justify-between w-full'>
                <span className='text-black/40'>{merge.merged_at?.split('T')[0]}</span>
                <span>{merge.author?.name}</span>
            </div>
        </div>
    )
}

export default MergeRQListTile