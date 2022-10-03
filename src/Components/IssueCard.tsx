import React from 'react'
import { Issue } from '../Resources/ResponseTypes'
import IssueLabel from './IssueLabel';

type IssueCardProps = {
    issue: Issue;
    handleOnClick: (i: Issue) => void;
    selected: boolean;
}

const IssueCard = ({ issue, handleOnClick, selected }: IssueCardProps) => {

    const date: string = issue.created_at!.split('T')[0] ?? '';
    
    return (
        <div 
        className='flex flex-col gap-2 bg-stone-200 hover:bg-stone-100 rounded-md py-3 px-3 justify-between hover:cursor-pointer'
        onClick={() => handleOnClick(issue)}
        style={{backgroundColor: selected ? '#f5f5f4' : ''}}
        >
            <span className='pb-2 flex text-md font-semibold'>{issue.title}</span>
            <div className='flex flex-wrap gap-2'>
                {issue.labels?.map((label) => {
                    return <IssueLabel label={label}/>
                })}
            </div>
            <span className='text-black/50'>{date}</span>
        </div>
    )
}

export default IssueCard