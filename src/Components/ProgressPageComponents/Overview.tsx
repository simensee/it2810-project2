import React, { useContext, useState } from 'react';
import { DataContext } from '../../Resources/DataContext';
import { Commit, User } from '../../Resources/ResponseTypes';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart, Line, Pie } from 'react-chartjs-2'
import { grid } from 'tailwindcss-classnames';
ChartJS.register(...registerables);
// import Graph from '../Graph';


const Overview = () => {
    const ctx = useContext(DataContext);
    const commitList: Commit[] = ctx.commitData;
    const userList: User[] = ctx.usersData;
    const usersForGraph: User[] = [];

    const dateList: string[] = [""];

    const dates = commitList.map((commit) => {
        if (!(dateList.includes(commit.committed_date!.split('T')[0])) && (dateList.length != 0)) {
            dateList.unshift(commit.committed_date!.split('T')[0]);
        }
    })

    const dateCount = dateList.map((date) => {
        let count = 0;
        commitList.forEach((commit) => {
            if (commit.committed_date?.split('T')[0] === date) {
                count++;
            }
        })
        return count;
    })

    userList.map((user) => {
        if (ctx.getUserTotalCommits(user) > 0) {
            usersForGraph.push(user);
        }
    })

    const backgroundColor = [
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',];

    const commitData = {
        labels: dateList,
        datasets: [{
            label: 'Commits',
            data: dateCount.map((count) => count),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,

        }],
        borderColor: 'black',
        borderwidth: 1,
    };

    var options = {
        scales: {
            x: {
                ticks: {
                    color: 'black',
                }
            },
            y: {
                beginAtZero: true,
                color: 'black',
                ticks: {
                    color: 'black',
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'black',
                }
            }
        }

    };

    var options2 = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: 'black',
                }
            }
        }
    };

    const userData = {
        labels: usersForGraph.map((user) => user.name),
        datasets: [{
            label: 'Commits',
            data: usersForGraph.map((user) => ctx.getUserTotalCommits(user)),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: usersForGraph.map((user) => backgroundColor[usersForGraph.indexOf(user)]),
            fill: true,
        }],
        borderColor: 'black',
        borderwidth: 1,
    };

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='w-11/12 mb-20'>
                <Line data={commitData} options={options} />
            </div>
            <div className='w-4/12 mt-3 mb-20 text-black'>
                <Pie data={userData} options={options2} />
            </div>
        </div>
    )
}

export default Overview