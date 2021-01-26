import * as React from 'react';
import Description from '~client/views/components/Details/Description';
import HistoricalData from '~client/views/components/Chart/HistoricalData';

class Details extends React.Component {

  render(): JSX.Element {
    return (
      <div>
        <Description />
        <HistoricalData />
      </div>);
  }
}

export default Details;
