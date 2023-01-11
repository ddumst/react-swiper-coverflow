import React, { FC } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from 'antd/lib/layout';

import './App.css';

import Landing from './pages/Landing';

const App: FC = () => {
  return (
    <>
      <Layout className="h-[100vh]">
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Redirect from="*" to="/" />
        </Switch>
      </Layout>
    </>
  )
};

export default App;
