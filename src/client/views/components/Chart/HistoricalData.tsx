import React from 'react';
import { Line } from 'react-chartjs-2';

export default class HistoricalData extends React.Component {
  chartReference: any;

  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
  }

  render(): JSX.Element {
    return (
      <div>
        <Line ref={this.chartReference} data={{
          labels: ['Monday', 'Sunday', 'Kekday'],
          datasets: [{
            label: 'Греча',
            fill: true,
            data:[10, 30, 22]
          }]
        }}/>
      </div>
    );
  }
}
