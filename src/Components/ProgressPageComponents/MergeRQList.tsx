import React, { useEffect, useState } from 'react'
import { MergeRequest } from '../../Resources/ResponseTypes'
import MergeDetailCard from '../DetailCards/MergeDetailCard';
import MergeRQDetails from './MergeRQDetails';
import MergeRQListTile from './MergeRQListTile';

type MergeRequestProps = {
    mergeRequestList: MergeRequest[];
}

const MergeRQList = ({ mergeRequestList }: MergeRequestProps) => {

    const [focusMerge, setFocusMerge] = useState<MergeRequest>({ title: 'empty' });

    useEffect(() => {
        const prevMergeRq: MergeRequest = mergeRequestList.find(m => m.id!.toString() === sessionStorage.getItem('prevMergeRq')) ?? {title: 'empty'};
        setFocusMerge(prevMergeRq);
      }, [])

    return (
        <div className='w-full h-full bg-white rounded-md grid grid-cols-3 gap-2'>
            <div className='col-span-2 flex flex-col gap-2 w-full p-2'>
                {(mergeRequestList.length !== 0) ?
                    mergeRequestList.map(m => {
                        return <MergeRQListTile 
                        merge={m} 
                        handleClick={(fm) => {
                            setFocusMerge(fm);
                            sessionStorage.setItem('prevMergeRq', fm.id!.toString());
                        }} 
                        />
                    })
                    :
                    <div>Ingen merge-requests</div>}
            </div>
            <div className='w-full h-full p-2'>
                <MergeRQDetails merge={focusMerge} />
            </div>
        </div>
    )
}

export default MergeRQList