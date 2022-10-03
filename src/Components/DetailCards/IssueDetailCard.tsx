import React, { useContext, useEffect, useState } from 'react'
import { backgroundColor } from 'tailwindcss-classnames';
import { DataContext } from '../../Resources/DataContext';
import { Commit, Issue } from '../../Resources/ResponseTypes';
import IssueLabel from '../IssueLabel';


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
            <div className='w-full rounded-md bg-white flex flex-col p-4 mt-16'>
                {(this.props.focusIssue.id === 0) ?
                    <div className='flex justify-center items-center'>
                        Ingen issue valgt
                    </div>
                    :
                    <>
                        <div className='flex justify-start'>
                            <div
                                className='inline-flex px-2 py-0.5 rounded-2xl text-white'
                                style={{ backgroundColor: (this.props.focusIssue.state === 'closed') ? '#c71212' : '#13ad18' }}>
                                {this.props.focusIssue.state}
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 text-center mt-6 mb-10 items-center'>
                            <span className='text-2xl font-semibold'>{this.props.focusIssue.title}</span>
                            <div className='flex flex-wrap gap-2'>
                                {this.props.focusIssue.labels?.map((label) => {
                                    return <IssueLabel label={label} />
                                })}
                            </div>
                        </div>
                        <div className='grid grid-cols-4 gap-x-1 gap-y-2 my-4'>
                            <span className='col-span-1'>Created by:</span>
                            <span className='col-span-3 text-black/40'>{this.props.focusIssue.author?.name}</span>
                            <span className='col-span-1'>Created at: </span>
                            <span className='col-span-3 text-black/40'>{this.props.focusIssue.created_at?.split('T')[0]}</span>
                        </div>
                        <div className='grid grid-cols-4 gap-x-1 gap-y-2 my-4'>
                            <span className='col-span-1'>Description: </span>
                            <p className='col-span-3 text-black/40'>{(this.props.focusIssue.description) ? this.props.focusIssue.description : 'none'}</p>
                        </div>
                        <div className='grid grid-cols-4 gap-x-1 gap-y-2 my-4'>
                            <span className='col-span-1'>Assignees: </span>
                            <div className='col-span-3 flex clex-cols-1 gap-1 text-black/40'>
                                {(this.props.focusIssue.assignees?.length !== 0)
                                    ? this.props.focusIssue.assignees?.map((ass) => {
                                        return <span>{ass.name}</span>
                                    }) : <span>None</span>}
                            </div>
                        </div>
                        {(this.props.focusIssue.state === 'closed') ?
                            <div className='grid grid-cols-4 gap-x-1 gap-y-2 my-4'>
                                <span className='col-span-1'>Closed by:</span>
                                <span className='col-span-3 text-black/40'>{this.props.focusIssue.closed_by?.name}</span>
                                <span className='col-span-1'>Created at: </span>
                                <span className='col-span-3 text-black/40'>{this.props.focusIssue.closed_at?.split('T')[0]}</span>
                            </div>
                            : null
                        }
                    </>
                }
            </div>
        )
    }
}
export default IssueDetailCard
