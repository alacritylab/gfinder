import * as React from 'react';
import SelectedFilter from './SelectedFilter';
import { IDeleteHandler } from '../../../dto/IHandlers';

interface ISelectedFiltersLineProps {
  selectedFilters: string[];
}

export default class SelectedFiltersLine extends React.Component<ISelectedFiltersLineProps & IDeleteHandler> {
  render() {
    const { selectedFilters, onFilterDelete } = this.props;

    return(
      <div className='gfinder-selected-filters-row'>
        {selectedFilters.map((filter, index) => (
          <SelectedFilter filterName={filter}
                          key={index}
                          onFilterDelete={onFilterDelete} />
        ))}
      </div>
    );
  }
}
