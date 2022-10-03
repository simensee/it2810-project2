import React, { useContext, useState } from 'react';
import { DataContext } from '../../Resources/DataContext';
import { Commit, MergeRequest } from '../../Resources/ResponseTypes';
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart, Line } from 'react-chartjs-2'
ChartJS.register(...registerables);
// import Graph from '../Graph';


const Overview = () => {
    const ctx = useContext(DataContext);
    const commitList: Commit[] = ctx.commitData;

    const [commitData, setCommitData] = useState({
        labels: commitList.reverse().map((date) => date.committed_date.split('T')[0]),
        datasets: [{
            label: 'Commits',
            data: commitList.map((date) => date.title),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        }],
        borderColor: 'black',
        borderwidth: 1,
    });

    console.log(commitData);

    return (
        <div className='max-w-screen-lg'>
            <h1>Heeeeiii</h1>
            <Line data={commitData} />
            {/* <Graph commitData={commitData}/> */}
        </div>
    )
}

export default Overview