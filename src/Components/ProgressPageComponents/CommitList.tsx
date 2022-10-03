import React from 'react'
import { Commit } from '../../Resources/ResponseTypes'

type CommitListProps = {
    commitList: Commit[];
}

const CommitList = ({commitList}: CommitListProps) => {
  return (
    <div className='flex flex-col gap-2'>
        {(commitList.length !== 0) ?
                commitList.map(c => {
                    return <div key={c.id} className='p-8 hover:outline flex pointer-events-auto'>
                        {c.id} - {c.title} - {c.author_name}
                    </div>
                })
                :
                <div>Ingen commits</div>}
    </div>
  )
}

export default CommitList