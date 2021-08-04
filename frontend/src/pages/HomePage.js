import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Form from '../components/Form';
import FiltersAndOrderings from '../components/FiltersAndOrderings';
import SpendingList from '../components/SpendingList';
import Layout from '../components/Layout';

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
      </Layout>
    </>
  );
}
