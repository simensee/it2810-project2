import React from 'react'
import { Issue } from '../Resources/ResponseTypes'
import IssueLabel from './IssueLabel';

type IssueCardProps = {
    issue: Issue;
    handleOnClick: (i: Issue) => void;
}

const IssueCard = ({ issue, handleOnClick }: IssueCardProps) => {
    
    return (
        <div 
        className='flex flex-col outline rounded-md p-2 h-28 justify-between'
        onClick={() => handleOnClick(issue)}
        >
            <span>{issue.title}</span>
            <div className='flex gap-2'>
                {issue.labels?.map((label) => {
                    return <IssueLabel label={label}/>
                })}
            </div>
            <span>{'none'}</span>
        </div>
    )
}

export default IssueCard