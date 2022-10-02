import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../Resources/DataContext';
import { Commit, Issue } from '../../Resources/ResponseTypes';


type IssueDetailCardProps = {
    focusIssue: Issue;
}

class IssueDetailCard extends React.Component<IssueDetailCardProps>  {
    constructor(props: IssueDetailCardProps) {
        super(props);
        this.state = {
            focusIssue: props.focusIssue,
        }
    }
    render() {
        return (
            <p> HEllo </p>
        )
    }
    
}
export default IssueDetailCard
