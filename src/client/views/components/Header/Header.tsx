import * as React from 'react';

interface IHeader {
  name: string;
  header: string;
}

export default class Header extends React.Component<IHeader> {
  constructor(props: IHeader) {
    super(props);
  }

  render(): JSX.Element {
    const { name, header } = this.props;

    return (
    <div className='gfinder-app-header'>
      <div className='gfinder-app-name'>{name}</div>
      <div className='gfinder-app-header'>{header}</div>
    </div>
    );
  }
}
