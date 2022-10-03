import React, { useContext } from 'react'
import { DataContext } from '../Resources/DataContext'
import { LabelColor } from '../Resources/ResponseTypes';

type IssueLabelProps = {
    label: string,
    color?: string,
}

const IssueLabel = ({ label, color = '#FFFFFF' }: IssueLabelProps) => {
    const ctx = useContext(DataContext);

    const labelColor: LabelColor =
        ctx.labelColors.find(col => col.name === label)
        ?? {
            name: label,
            color: color,
        };

    return (
        <div className='px-1 py-0.5 rounded-md text-white' style={{backgroundColor: labelColor.color}}>
            {label}
        </div>
    )
}

export default IssueLabel