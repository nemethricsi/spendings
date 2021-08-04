import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Form from './components/Form';
import FiltersAndOrderings from './components/FiltersAndOrderings';
import SpendingList from './components/SpendingList';
import Layout from './components/Layout';

export const MainContainer = styled.main`
  max-width: 800px;
  margin: 1rem auto;
`;

export default function App() {
  const [refresh, setRefresh] = useState(false);
  const [spendings, setSpendings] = useState([]);
  const [currencyFilter, setCurrencyFilter] = useState('');
  const [ordering, setOrdering] = useState('');

  function toggleRefresh() {
    setRefresh(!refresh);
  }

  return (
    <>
      <Layout>
        <MainContainer>
          <Form
            setSpendings={setSpendings}
            spendings={spendings}
            toggleRefresh={toggleRefresh}
          />
          <FiltersAndOrderings
            currencyFilter={currencyFilter}
            setCurrencyFilter={setCurrencyFilter}
            ordering={ordering}
            setOrdering={setOrdering}
          />
          <SpendingList
            spendings={spendings}
            setSpendings={setSpendings}
            toggleRefresh={toggleRefresh}
            refresh={refresh}
            currencyFilter={currencyFilter}
            ordering={ordering}
          />
        </MainContainer>
      </Layout>
    </>
  );
}
