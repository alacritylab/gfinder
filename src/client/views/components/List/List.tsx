import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import IListItemMin from '../../dto/IListItemMin';
import Item from './Item';
import AppViewTypes from '../../dto/enums/AppViewTypes';

interface IListProps {
  items: IListItemMin[];
  appView?: AppViewTypes;
}

export default class List extends React.Component<IListProps> {
  getItemGrid(): number {
    switch (this.props.appView) {
      case AppViewTypes.MOBILE:
        return 12;
      case AppViewTypes.DESKTOP_SM:
        return 6;
      case AppViewTypes.DESKTOP_XL:
      default:
        return 4;
    }
  }

  getGridDirection(): 'row' | 'column' {
    switch (this.props.appView) {
      case AppViewTypes.MOBILE:
        return 'column';
      case AppViewTypes.DESKTOP_SM:
      case AppViewTypes.DESKTOP_XL:
      default:
        return 'row';
    }
  }

  render(): JSX.Element {
    const itemGrid = this.getItemGrid() as any;
    const gridDirection = this.getGridDirection();

    return (
      <Grid container direction={gridDirection} spacing={3}>
        {this.props.items.map((item, indx) => (
          <Grid item sm={itemGrid} key={indx}>
            <Item item={item}/>
          </Grid>
        ))}
      </Grid>
    )
  }
}
