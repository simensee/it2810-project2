import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../Resources/DataContext';
import { Commit, MergeRequest } from '../../Resources/ResponseTypes';


type MergeDetailCardProps = {
    focusMerge: MergeRequest;
}

const MergeDetailCard = ({ focusMerge }: MergeDetailCardProps) => {

    const ctx = useContext(DataContext);
    //const [userCommits, setUserCommits] = useState(0);

   

    return (
        <div>
            {focusMerge.id}
        </div>
    )
}

export default MergeDetailCard