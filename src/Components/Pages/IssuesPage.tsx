import React, { useContext, useState } from 'react'
import { DataContext } from '../../Resources/DataContext';
import { Commit, Issue, MergeRequest } from '../../Resources/ResponseTypes'
import IssueDetailCard from '../DetailCards/IssueDetailCard';
import IssueCard from '../IssueCard';
const IssuePage = () => {

  const [displayIssueDetails, toggleIssueDetails] = useState(false);
  const [focusIssue, setFocusIssue] = useState<Issue>({
    id: 0,
  });

  const ctx = useContext(DataContext);
  const issueList: Issue[] = ctx.issueData;
  const todoIssues: Issue[] = [];
  const doingIssues: Issue[] = [];
  const doneIssues: Issue[] = [];


  issueList.map((i) => {
    if (i.labels?.includes('Todo')) {
      todoIssues.push(i);
    } else if (i.labels?.includes('Doing')) {
      doingIssues.push(i);
    } else if (i.labels?.includes('Done')) {
      doneIssues.push(i);
    }
  });

  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='col-span-2 grid grid-cols-3 gap-4'>
        <div className='bg-white py-4 px-2'>
          <span>TODO</span>
          <div className='flex flex-col gap-3 mt-4'>
            {todoIssues.map((i) => {
              return <IssueCard handleOnClick={(thisIssue) => setFocusIssue(thisIssue)} key={i.id} issue={i} />
            })}
          </div>
        </div>
        <div className='bg-white py-4 px-2'>
          <span>Doing</span>
          <div className='flex flex-col gap-3 mt-4'>
            {doingIssues.map((i) => {
              return <IssueCard handleOnClick={(thisIssue) => setFocusIssue(thisIssue)} key={i.id} issue={i} />
            })}
          </div>
        </div>
        <div className='bg-white py-4 px-2'>
          <span>Done</span>
          <div className='flex flex-col gap-3 mt-4'>
            {doneIssues.map((i) => {
              return <IssueCard handleOnClick={(thisIssue) => setFocusIssue(thisIssue)} key={i.id} issue={i} />
            })}
          </div>
        </div>
      </div>
      <div className='w-full'>
        <IssueDetailCard
          focusIssue={focusIssue}
        />
      </div>
    </div>
  )
}

// {issueList.map((m, i) => {
//   // Lise sett in usercard her :)
//   return <div key={m.id} className='p-8 hover:outline flex pointer-events-auto' onClick={() => {
//     setFocusIssue(m)
//     }}>
//     {m.id} - {m.title}
//   </div>
// })}

export default IssuePage