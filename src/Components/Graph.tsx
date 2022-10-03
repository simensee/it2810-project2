import React from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
import { Commit } from '../Resources/ResponseTypes';

type GraphProps = {
    commitData: Commit;
}

const Graph = ({commitData}: GraphProps) => {
    return (
        <div>
            {/* <Line data={commitData}/> */}
        </div>
    )
}

export default Graph