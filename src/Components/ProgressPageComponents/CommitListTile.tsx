import { SportsMmaOutlined } from '@mui/icons-material';
import React from 'react'
import { Commit } from '../../Resources/ResponseTypes'

type CommitListTileProps = {
    commit: Commit;
    handleClick: (c: Commit) => void;
    selected: boolean;
}

const CommitListTile = ({ commit, handleClick, selected }: CommitListTileProps) => {
    return (
        <div
            className='flex flex-col gap-1 bg-stone-200 hover:bg-stone-100 rounded-md py-1 px-2'
            onClick={() => handleClick(commit)}
            style={{backgroundColor: selected ? '#f5f5f4' : ''}}>
            <span className='w-3/5 truncate'>{commit.title}</span>
            <div className='w-full flex flex-row justify-between'>
                <span className='text-black/40'>{commit.committed_date?.split('T')[0]}</span>
                <span>{commit.author_name}</span>
            </div>
        </div>
    )
}

export default CommitListTile