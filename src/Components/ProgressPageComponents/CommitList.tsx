import React, { useEffect, useState } from 'react'
import { Commit } from '../../Resources/ResponseTypes'
import CommitListDetails from './CommitListDetails';
import CommitListTile from './CommitListTile';

type CommitListProps = {
  commitList: Commit[];
}

const CommitList = ({ commitList }: CommitListProps) => {

  const [focusCommit, setFocusCommit] = useState<Commit>({ title: 'empty' });

  useEffect(() => {
    const prevCommit: Commit = commitList.find(c => c.short_id === sessionStorage.getItem('prevCommit')) ?? {title: 'empty'};
    setFocusCommit(prevCommit);
  }, [])

  return (
    <div className='w-full h-full bg-white rounded-md grid grid-cols-3 gap-2'>
      <div className='col-span-2 flex flex-col gap-2 w-full h-full p-2 overflow-y-scroll'>
        {(commitList.length !== 0) ?
          commitList.map(c => {
            return <CommitListTile 
            commit={c} 
            selected={(c === focusCommit)}
            handleClick={(fc) => {
              setFocusCommit(fc);
              sessionStorage.setItem('prevCommit', fc.short_id!);
            }} 
            />
          })
          :
          <div>Ingen commits</div>}
      </div>
      <div className='w-full h-full p-2'>
        <CommitListDetails commit={focusCommit} />
      </div>
    </div>
  )
}

export default CommitList