import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../Resources/DataContext';
import { Commit, MergeRequest } from '../../Resources/ResponseTypes';


type MergeDetailCardProps = {
    focusUser: MergeRequest;
}

const MergeDetailCard = ({ focusUser }: MergeDetailCardProps) => {

    const ctx = useContext(DataContext);
    //const [userCommits, setUserCommits] = useState(0);

   

    return (
        <div>

        </div>
    )
}

export default MergeDetailCard