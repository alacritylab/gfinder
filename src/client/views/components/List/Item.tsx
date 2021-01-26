import * as React from 'react';
import IListItemMin from '../../dto/IListItemMin';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Divider  from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

export interface IItemProp {
  item: IListItemMin
}

export default class Item extends React.Component<IItemProp> {
  // from kopyikas to hrn
  private convertPrice(price: number) {
    const priceArray = String(price).split('');
    priceArray.splice(-2, 0, '.');
    return priceArray.join('');
  }

  render() {
    const { item } = this.props;

    return (
      <Card elevation={3}>
        <CardContent>
          <div className='gfinder-card-image-container'>
            <CardMedia className='gfinder-card-image bg-fit-image' image={item.imgUrl}/>
            <div className='gfinder-image-button-container'>
              <div className='gfinder-image-button' onClick={() => window.open(item.webUrl, '_blank')}>
                Сторiнка Продукту
              </div>
            </div>
          </div>
          <div className='gfinder-item-row gfinder-item-main-rows'>
            <div className='gfinder-item-store'>
              {item.name}
            </div>
            <div className='gfinder-item-manufacturer'>
              <a href={item.webUrl} target='_blank'>{item.store.name}</a>
            </div>
          </div>
          <Divider />
          <Grid className='gfinder-item-row gfinder-item-additional-rows' container spacing={3}>
            <Grid item sm={4}>
              <div>Вага: {item.weight}гр.</div>
              <div >Цiна: {this.convertPrice(item.packPrice)}грн</div>
            </Grid>
            <Grid item sm={8}>
              <div className='aligned-right gfinder-main-item-price'>
                Цiна за 100гр: {this.convertPrice(item.currentPrice)}грн
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
