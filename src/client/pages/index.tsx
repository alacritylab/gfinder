import React from 'react'
import { NextPage } from 'next'
import Home from '~client/views/highLevelViews/views/home';
import * as dotenv from 'dotenv';
import Details from '~client/views/highLevelViews/views/details';
import * as fs from 'fs';

type HomePageProps = {
  items: any;
  filters: any;
}

const Index: NextPage<HomePageProps> = (props) => {
  const STATIC_PROPS = {
    appName: 'gFinder.',
    appHeader: 'Знайди кращу ціну на гречку у країні!'
  };
  const PROPS_APP_DATA = { ...STATIC_PROPS, ...props };

  return (
    <div className='gfinder-app'>
      <div className='gfinder-app-container'>
        <Home {...PROPS_APP_DATA} />
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const envConfig = dotenv.parse(fs.readFileSync('.env'));
  const itemsResp = await fetch(envConfig.APP_URL + ':' + envConfig.WEB_PORT + '/api/item/list');
  const filtersResp = await fetch( envConfig.APP_URL + ':' + envConfig.WEB_PORT + '/api/item/filters');
  const items = await itemsResp.json();
  const filters = await filtersResp.json();

  return { props: { items, filters } };
};

export default Index;
