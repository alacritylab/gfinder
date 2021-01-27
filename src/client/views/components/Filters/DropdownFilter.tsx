import * as React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl'
import MenuItem from '@material-ui/core/MenuItem';
import SortTypes from '~client/views/dto/enums/SortTypes';
import { InputLabel } from '@material-ui/core';

interface IDropdownFilterProps {
  currentSort: SortTypes;
  onSortChange: (sortBy: SortTypes) => void;
}

export default class DropdownFilter extends React.Component<IDropdownFilterProps> {
  render(): JSX.Element {
    const { currentSort, onSortChange } = this.props;

    return (
      <FormControl variant='outlined' style={{width: '100%'}}>
        <InputLabel>Сортувати</InputLabel>
        <Select className='gfinder-select-general'
                value={currentSort}
                onChange={(event) => onSortChange(event.target.value as SortTypes)}>
          <MenuItem value={SortTypes.DESC}>Спочатку дорогi</MenuItem>
          <MenuItem value={SortTypes.ASC}>Спочатку дешевi</MenuItem>
        </Select>
      </FormControl>
    );
  }
}
