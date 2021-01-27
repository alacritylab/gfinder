import React from 'react'
import { NextPage } from 'next'
import Details from '~client/views/highLevelViews/views/details';

interface IItemDetailsProps {
  itemId: string;
}

const ItemDetails: NextPage<IItemDetailsProps> = (props) => {
  return (
    <div className='gfinder-app'>
      <div className='gfinder-app-container'>
        {/*<Details />*/}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  return { props: { name: 'Греча', shop: 'Novus' } };
};

export default ItemDetails;
