import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UpdatePage from './pages/UpdatePage';

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/update/:spendingId'>
            <UpdatePage />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
