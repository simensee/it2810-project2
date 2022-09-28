import React, { useContext, useState } from 'react'
import { DataContext } from '../../Resources/DataContext';
import { Commit, MergeRequest } from '../../Resources/ResponseTypes'
import MergeDetailCard from '../DetailCards/MergeDetailCard';
const ProgressPage = () => {

  const [displayUserDetails, toggleUserDetails] = useState(false);
  const [focusMergeRequest, setFocusMergeRequest] = useState<MergeRequest>({
    id: 0,
  });

  const ctx = useContext(DataContext);
  const mergeList: MergeRequest[] = ctx.mergeData;
  
  return (
    <div className='grid grid-cols-3 gap-4'>
      <div className='col-span-2 grid grid-cols-3 gap-4'>
        {mergeList.map((m, i) => {
          // Lise sett in usercard her :)
          return <div key={m.id} className='p-8 hover:outline flex pointer-events-auto' onClick={() => {
            setFocusMergeRequest(m)
            }}>
            {m.id} - {m.title}
          </div>
        })}
      </div>
      <div className='w-full'>
        <MergeDetailCard 
        focusMerge={focusMergeRequest}
        />
      </div>
    </div>
  )
}

export default ProgressPage