import * as React from 'react';
import Filter from './Filter';
import IHandlers from '../../dto/IHandlers';

interface IFiltersContainerProps {
  filtersState: { [key: string]: boolean };
  filters: any;
}

export default class FiltersContainer extends React.Component<IFiltersContainerProps & IHandlers> {
  render() {
    const { filters, onFilterChange, onFilterDelete, filtersState } = this.props;

    return filters.map((filter, indx) => (
      <Filter filter={filter}
              filtersState={filtersState}
              onFilterChange={onFilterChange}
              onFilterDelete={onFilterDelete}
              key={indx}/>
    ));
  }
}
