import React from 'react'
import { MergeRequest } from '../../Resources/ResponseTypes'

type MergeRequestProps = {
    mergeRequestList: MergeRequest[];
}

const MergeRQList = ({ mergeRequestList }: MergeRequestProps) => {
    return (
        <div className='flex flex-col gap-2'>
            {(mergeRequestList.length !== 0) ?
                mergeRequestList.map(m => {
                    return <div key={m.id} className='p-8 hover:outline flex pointer-events-auto'>
                        {m.id} - {m.title} - {m.author!.username!}
                    </div>
                })
                :
                <div>Ingen Merge requests</div>}
        </div>
    )
}

export default MergeRQList