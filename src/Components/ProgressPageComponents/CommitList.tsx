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
    const prevCommit: Commit = commitList.find(c => c.short_id === sessionStorage.getItem('prevCommit')) ?? { title: 'empty' };
    setFocusCommit(prevCommit);
  }, [])

  return (
    <div className='w-full h-3/4 grow-0 bg-white p-2 flex flex-col gap-2 rounded-md md:grid md:grid-cols-3 md:gap-1'>
      <div className='md:col-span-2 order-last md:order-first grid grid-col gap-2 p-2 overflow-y-scroll'>
        {(commitList.length !== 0) ?
          commitList.map(c => {
            return <CommitListTile
              key={c.short_id}
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
      <div className='w-full md:h-full md:py-2 pr-2'>
        <CommitListDetails commit={focusCommit} />
      </div>
    </div>
  )
}

export default CommitList