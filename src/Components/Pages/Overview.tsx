import React, { useContext, useState } from 'react';
import { DataContext } from '../../Resources/DataContext';
import { Commit, User } from '../../Resources/ResponseTypes';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart, Line, Pie } from 'react-chartjs-2'
ChartJS.register(...registerables);
// import Graph from '../Graph';


const Overview = () => {
    const ctx = useContext(DataContext);
    const commitList: Commit[] = ctx.commitData;
    const userList: User[] = ctx.usersData;
    // console.log('commitList length', commitList.length);

    const dateList: string[] = [""];

    const dates = commitList.reverse().map((commit) => {
        if (!(dateList.includes(commit.committed_date.split('T')[0])) && (dateList.length != 0)) {
            dateList.push(commit.committed_date.split('T')[0]);
        }
    })

    // console.log('dateList', dateList);

    const dateCount = dateList.map((date) => {
        let count = 0;
        commitList.reverse().forEach((commit) => {
            if (commit.committed_date.split('T')[0] === date) {
                count++;
            }
        })
        return count;
    })

    const userNames: string[] = [];

    const usersWithCommits = userList.map((user) => {
        if (ctx.getUserTotalCommits(user) > 0) {
            userNames.push(user.name);
        }
    })
    
    const commitData = {
        labels: dateList,
        datasets: [{
            label: 'Commits',
            data: dateCount.map((count) => count),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            fill: true,
            
        }],
        borderColor: 'black',
        borderwidth: 1,
    };

    var options = {
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 35,
            }
        }
    }
    console.log(commitData);

    const userData = {
        labels: userNames,
        datasets: [{
            label: 'Commits',
            data: userList.map((user) => ctx.getUserTotalCommits(user)),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: [
                'rgba(53, 162, 235, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                // 'rgba(255, 206, 86, 0.5)',
                // 'rgba(75, 192, 192, 0.5)',
            ],
            fill: true,
        }]
    }

    ctx.usersData.map((user) => {console.log(user.name ,ctx.getUserTotalCommits(user))});


    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='w-11/12'>
                <Line data={commitData} options={options}/>
            </div>
            <div className='w-4/12 mt-7'>
                <Pie data={userData}/>
            </div>
        </div>
    )
}

export default Overview