import * as React from 'react';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import FiltersContainer from '../../components/Filters/FiltersContainer';
import Footer from '../../components/Footer/Footer';
import SelectedFiltersLine from '../../components/Filters/SelectedFilters/SelectedFiltersLine';
import IFilter from '../../dto/IFilter';
import AppViewTypes from '../../dto/enums/AppViewTypes';
import DropdownFilter from '../../components/Filters/DropdownFilter';
import GfinderPagination from '../../components/Pagination/GfinderPagination';
import RequestService from '../../services/RequestService';
import IFiltersResponse from '../../dto/IFiltersResponse';
import SortTypes from '~client/views/dto/enums/SortTypes';
import { Button } from '@material-ui/core';

interface IHomeProps {
  appName: string;
  appHeader: string;
  items: any;
  filters: any;
}

interface IHomeState {
  view: AppViewTypes;
  filters: IFilter[];
  selectedFilters: string[];
  listItems: any[];
  filterCheckedState: { [key: string]: boolean };
  meta: any;
  sortBy: SortTypes;
  page: number;
}

class Home extends React.Component<IHomeProps, IHomeState> {
  private meta: any = {};

  constructor(props: IHomeProps) {
    super(props);

    this.state = {
      view: AppViewTypes.DESKTOP_XL,
      filters: [],
      selectedFilters: [],
      listItems: this.props.items.items,
      filterCheckedState: {},
      meta: this.props.items.meta,
      sortBy: SortTypes.DESC,
      page: 1
    };
  }

  private fetchItems(): void {
    RequestService.getItemsWithFilters(
      this.state.page,
      this.state.sortBy,
      this.state.selectedFilters
    ).then(res => res.json())
      .then(this.processItemsResponse.bind(this, this.state.page));
  }

  private resetFilters(): void {
    this.setState({
      ...this.state,
      selectedFilters: [],
      filterCheckedState: {},
    });
    this.loadPage(this.state.page);
  }

  private processItemsResponse(page, itemsData): void {
    this.setState({
      ...this.state, page,
      listItems: itemsData.items,
      meta: itemsData.meta
    });
  }

  private onFilterChange(filterName: string): void {
    if (!this.state.selectedFilters.includes(filterName)) {
      const newSelectedFilters = this.state.selectedFilters.slice();
      newSelectedFilters.push(filterName);

      const newFiltersState = {
        ...this.state.filterCheckedState,
        [filterName]: true
      };

      this.setState({
        ...this.state,
        selectedFilters: newSelectedFilters,
        filterCheckedState: newFiltersState
      });

      this.fetchItems();
    }
  }

  private onFilterDelete(filterName: string): void {
    const newSelectedFiltersState = this.state.selectedFilters
      .filter((item) => item !== filterName);

    const newFiltersState = {
      ...this.state.filterCheckedState,
      [filterName]: false
    };

    this.setState({
      ...this.state,
      selectedFilters: newSelectedFiltersState,
      filterCheckedState: newFiltersState
    });

    this.fetchItems();
  }

  private changeSortBy(newSort: SortTypes): void {
    this.setState({...this.state, sortBy: newSort});
    this.fetchItems();
  }

  private getView(width: number): AppViewTypes {
    if (width >= 1280) return AppViewTypes.DESKTOP_XL;
    if (width < 1280 && width >= 768) return AppViewTypes.DESKTOP_SM;
    if (width < 768) return AppViewTypes.MOBILE;
  }

  private getFilterGrid(): number {
    switch (this.state.view) {
      case AppViewTypes.MOBILE:
        return 12;
      case AppViewTypes.DESKTOP_SM:
        return 4;
      case AppViewTypes.DESKTOP_XL:
      default:
        return 3;
    }
  }

  private getItemsGrid(): number {
    switch (this.state.view) {
      case AppViewTypes.MOBILE:
        return 12;
      case AppViewTypes.DESKTOP_SM:
        return 8;
      case AppViewTypes.DESKTOP_XL:
      default:
        return 9;
    }
  }

  private updateAppView(): void {
    const newView = this.getView(window.innerWidth);

    if (newView !== this.state.view) {
      this.setState({ ...this.state, view: newView });
    }
  }

  private processFilters(filters: any[]): any[] {
    const newFilters = [];

    filters.forEach(filter => {
      if (filter.name === 'Вага') {
        newFilters.push({
          name: 'Вага',
          type: filter.type,
          options: filter.dataSet
        });
      }

      if (filter.name === 'Виробник') {
        newFilters.push({
          name: 'Виробник',
          type: filter.type,
          options: filter.dataSet
            .filter(value => Boolean(value))
            .sort((a, b) => a.localeCompare(b))
        });
      }
    });

    return newFilters;
  }

  private loadPage(page: number): void {
    RequestService.getItemsByPage(page, this.state.sortBy)
      .then(response => response.json())
      .then(this.processItemsResponse.bind(this, page));
  }

  public componentDidMount() {
    this.updateAppView();
    this.setState({ filters: this.processFilters(this.props.filters) });
    window.addEventListener('resize', this.updateAppView.bind(this));
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.updateAppView.bind(this));
  }

  render(): JSX.Element {
    const onFilterDelete = this.onFilterDelete.bind(this);
    const filterGrid = this.getFilterGrid() as any;
    const itemsGrid = this.getItemsGrid() as any;
    const {
      appName: name,
      appHeader: header,
    } = this.props;

    return (
      <div>
        <Header name={name} header={header}/>
        <Container classes={{root: 'gfinder-body-container'}} maxWidth='xl'>
          <Grid container spacing={3}>
            <Grid item sm={itemsGrid} style={{ width: '100%' }}>
              <SelectedFiltersLine selectedFilters={this.state.selectedFilters}
                                   onFilterDelete={onFilterDelete}/>
            </Grid>
            <Grid item sm={filterGrid} style={{width: '100%', display: 'flex', alignItems: 'center'}}>
              <DropdownFilter currentSort={this.state.sortBy}
                              onSortChange={this.changeSortBy.bind(this)}/>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item sm={filterGrid} style={{ width: '100%' }}>
              <FiltersContainer filters={this.state.filters.slice()}
                                filtersState={this.state.filterCheckedState}
                                onFilterChange={this.onFilterChange.bind(this)}
                                onFilterDelete={onFilterDelete}/>
              <Button variant='outlined' onClick={this.resetFilters.bind(this)}>
                Обнулити фiльтри
              </Button>
            </Grid>
            <Grid item sm={itemsGrid} style={{width: '100%'}}>
              <List items={this.state.listItems} appView={this.state.view}/>
            </Grid>
          </Grid>
        </Container>
        <GfinderPagination loadPage={this.loadPage.bind(this)}
                           totalCount={this.state.meta.totalPages}
                           appView={this.state.view}/>
        <Divider/>
        <Footer/>
      </div>
    );
  }
}

export default Home;
