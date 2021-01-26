import * as React from 'react';
import { Pagination } from '@material-ui/lab';
import AppViewTypes from '~client/views/dto/enums/AppViewTypes';

interface IGfinderPaginationProps {
  totalCount: number;
  loadPage: (pageNumber: number) => void;
  appView: AppViewTypes
}

export default class GfinderPagination extends React.Component<IGfinderPaginationProps> {
  private onPageChange(event: any, pageNumber: number): void {
    this.props.loadPage(pageNumber);
  }

  private getPaginationSize(): 'small' | 'medium' | 'large' {
    switch (this.props.appView) {
      case AppViewTypes.DESKTOP_XL:
      case AppViewTypes.DESKTOP_SM:
        return 'large';
      case AppViewTypes.MOBILE:
      default:
        return 'medium';
    }
  }

  render() {
    return(
      <div className='gfinder-pagination-container'>
        <Pagination count={this.props.totalCount}
                    onChange={this.onPageChange.bind(this)}
                    size={this.getPaginationSize()}
                    variant='outlined'
                    shape='rounded' />
      </div>
    );
  }
}
