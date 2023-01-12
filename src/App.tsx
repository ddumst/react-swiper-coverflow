import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from 'antd/lib/layout';

import './App.css';

import Landing from './pages/Landing';

const App: FC = () => {
  return (
    <>
      <Layout className="h-[100vh] relative">
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Redirect from="*" to="/" />
        </Switch>

        
        <a 
          className="absolute top-0 right-0 z-50"
          href="https://github.com/ddumst/react-swiper-coverflow" 
          target={"_blank"}
        >
          <img 
            decoding="async" 
            loading="lazy" 
            width="149" 
            height="149" 
            src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149" 
            className="attachment-full size-full" 
            alt="Fork me on GitHub" 
            data-recalc-dims="1"
          />
        </a>
      </Layout>
    </>
  )
};

export default App;
