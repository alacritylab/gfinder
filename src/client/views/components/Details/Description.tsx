import { Card, Grid } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import * as React from 'react';

export default class Description extends React.Component {
  render() {
    return (
      <Card elevation={3}>
        <CardContent>
          <Grid container direction={'row'}>
            <Grid item sm={4}>
              <div className='gfinder-grecha-is-love-image'/>
            </Grid>
            <Grid item sm={8}>
              <div className='gfinder-grecha-info'>
                <div>Назва</div>
                <div>Торгiвельна Марка</div>
                <div>Опис</div>
                <div>
                  Гречка, гречиха, греча - все це назва однієї унікальної рослини,
                  батьківщиною якої вважаються гірські райони Індії та Непалу,
                  де її почали культивувати близько 4 тис. років тому. До нас гречка
                  потрапила з Греції, звідси і отримала свою назву - «гречка», тобто
                  «Грецька крупа». Гречка відноситься до сімейства гречаних.
                  У XX столітті гречку стали називати «царицею круп» за її рекордний
                  вміст вітамінів, мікроелементів, повноцінних білків, необхідних
                  для здоров'я людини.
                </div>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}
