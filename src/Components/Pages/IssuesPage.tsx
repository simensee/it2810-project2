import React, { useContext, useState } from 'react'
import { DataContext } from '../../Resources/DataContext';
import { Commit, Issue, MergeRequest } from '../../Resources/ResponseTypes'
  import IssueDetailCard from '../DetailCards/IssueDetailCard';
const IssuePage = () => {

  const [displayIssueDetails, toggleIssueDetails] = useState(false);
  const [focusIssue, setFocusIssue] = useState<Issue>({
    id: 0,
  });

  const ctx = useContext(DataContext);
  const issueList: Issue[] = ctx.issueData;
  
  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='col-span-2 grid grid-cols-3 gap-4'>
        {issueList.map((m, i) => {
          // Lise sett in usercard her :)
          return <div key={m.id} className='p-8 hover:outline flex pointer-events-auto' onClick={() => {
            setFocusIssue(m)
            }}>
            {m.id} - {m.title}
          </div>
        })}
      </div>
      <div className='w-full'>
        <IssueDetailCard 
           focusIssue = {focusIssue}
        />
      </div>
    </div>
  )
}

export default IssuePage