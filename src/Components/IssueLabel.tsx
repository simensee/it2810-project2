import React from 'react'

type IssueLabelProps = {
    label: string,
}

const IssueLabel = ({ label }: IssueLabelProps) => {
    return (
        <div className='bg-orange-600 px-1 py-0.5 rounded-md text-white'>
            {label}
        </div>
    )
}

export default IssueLabel