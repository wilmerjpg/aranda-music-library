import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import { Layout } from 'antd';
import Top from './components/Top';
import Favorites from './components/Favorites';

const { Content } = Layout;

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Content>
          <Switch>
            <Route exact path='/'>
              <Top />
            </Route>
            <Route exact path='/favorites'>
              <Favorites />
            </Route>
            <Redirect to='/' />
          </Switch>
        </Content>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
