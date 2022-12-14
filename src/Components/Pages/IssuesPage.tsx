import { Divider } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../Resources/DataContext';
import { Commit, Issue, LabelColor, MergeRequest } from '../../Resources/ResponseTypes'
import IssueDetailCard from '../DetailCards/IssueDetailCard';
import IssueCard from '../IssueCard';

const IssuePage = () => {

  const [hasColors, setHasColors] = useState(false);
  const [focusIssue, setFocusIssue] = useState<Issue>({
    id: 0,
  });

  const ctx = useContext(DataContext);

  const setup = async () => {
    await ctx.fetchLabelColors().then(setHasColors(true));
  }

  const handleIssueClick = (issue: Issue) => {
    setFocusIssue(issue);
    sessionStorage.setItem('focusedIssue', issue.id!.toString());
  }

  useEffect(() => {
    setup();
    const prevSelectedIssue: Issue = ctx.issueData.find(i => i.id?.toString() === sessionStorage.getItem('focusedIssue')) ?? { id: 0, };
    setFocusIssue(prevSelectedIssue);
  }, []);

  const todoIssues: Issue[] = [];
  const doingIssues: Issue[] = [];
  const doneIssues: Issue[] = [];

  ctx.issueData.map((i) => {
    if (i.state?.includes('closed')) {
      doneIssues.push(i);
    } else if (i.labels?.includes('Todo')) {
      todoIssues.push(i);
    } else if (i.labels?.includes('Doing')) {
      doingIssues.push(i);
    } else if (i.labels?.includes('Done')) {
      doneIssues.push(i);
    }
  });

  return (
    <div className='flex flex-col p-2 gap-2 lg:grid lg:h-full lg:grid-cols-3 lg:gap-4'>
      <div className='bg-white rounded-md lg:col-span-2 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-auto'>
        <div className='py-4 px-2 rounded-md'>
          <span className='text-xl'>Todo ({todoIssues.length})</span>
          <Divider className='py-1' />
          {hasColors ?
            <div className='flex flex-col gap-3 mt-4'>
              {todoIssues.map((i) => {
                return <IssueCard handleOnClick={(thisIssue) => handleIssueClick(thisIssue)} key={i.id} issue={i} selected={(focusIssue.id === i.id)} />
              })}
            </div>
            : null
          }
        </div>
        <div className='bg-white py-4 px-2 rounded-md'>
          <span className='text-xl'>Doing ({doingIssues.length})</span>
          <Divider className='py-1' />
          {hasColors ?
            <div className='flex flex-col gap-3 mt-4'>
              {doingIssues.map((i) => {
                return <IssueCard handleOnClick={(thisIssue) => handleIssueClick(thisIssue)} key={i.id} issue={i} selected={(focusIssue.id === i.id)} />
              })}
            </div>
            : null
          }
        </div>
        <div className='bg-white py-4 px-2 rounded-md'>
          <span className='text-xl'>Done ({doneIssues.length})</span>
          <Divider className='py-1' />
          <div className='flex flex-col gap-3 mt-4'>
            {doneIssues.map((i) => {
              return <IssueCard handleOnClick={(thisIssue) => handleIssueClick(thisIssue)} key={i.id} issue={i} selected={(focusIssue.id === i.id)} />
            })}
          </div>
        </div>
      </div>
      <div className='w-full h-1/4  md:h-full lg:order-last order-first'>
        <IssueDetailCard
          focusIssue={focusIssue}
        />
      </div>
    </div>
  )
}

export default IssuePage