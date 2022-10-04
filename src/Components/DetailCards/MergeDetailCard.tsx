import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../Resources/DataContext';
import { Commit, MergeRequest } from '../../Resources/ResponseTypes';


type MergeDetailCardProps = {
    focusMerge: MergeRequest;
}

const MergeDetailCard = ({ focusMerge }: MergeDetailCardProps) => {

    const ctx = useContext(DataContext);

    return (
        <div>
            {focusMerge.id}
        </div>
    )
}

export default MergeDetailCard