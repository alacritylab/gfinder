import * as React from 'react';
import Chip from '@material-ui/core/Chip';
import { IDeleteHandler } from '../../../dto/IHandlers';

interface ISelectedFilterProps {
  filterName: string
}

export default class SelectedFilter extends React.Component<ISelectedFilterProps & IDeleteHandler> {
  render() {
    const { filterName, onFilterDelete } = this.props;

    return(
      <div className='gfinder-single-selected-filter'>
        <Chip size='medium'
              className='gfinder-filter-chip'
              variant='outlined'
              label={filterName}
              onDelete={() => onFilterDelete(filterName)}/>
      </div>
    );
  }
}
