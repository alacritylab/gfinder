import * as React from 'react';

export default class Footer extends React.Component {
  render(): JSX.Element {
    return (
      <div className='gfinder-app-footer'>
        <span>Design & Production by</span>
        <div>
          <span className='alacrity-logo'>Alacrity lab.<span>&#169;</span></span>
          <br />
          <span className='tos'>All Rights Reserved.</span>
        </div>
      </div>
    );
  }
}
