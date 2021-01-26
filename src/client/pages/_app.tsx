import App, { AppProps, AppContext } from 'next/app'
import '../views/styles/main.css';
import '../views/styles/app-header.css';
import '../views/styles/app-body.css';
import '../views/styles/app-item.css';
import '../views/styles/app-footer.css';
import '../views/styles/app-filter.css';
import '../views/styles/app-selected-items.css';
import '../views/styles/item-details.css';
import Head from 'next/head';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
};

// This disables the ability to perform automatic static optimization, causing every page in your app to be server-side rendered.
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps }
};
export default MyApp
