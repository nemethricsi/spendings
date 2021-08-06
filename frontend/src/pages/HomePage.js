import React, { useEffect, useState } from 'react';
import Form from '../components/Form';
import FiltersAndOrderings from '../components/FiltersAndOrderings';
import SpendingList from '../components/SpendingList';
import Layout from '../components/Layout';

export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [currencyFilter, setCurrencyFilter] = useState('');
  const [ordering, setOrdering] = useState('');

  return (
    <>
      <Layout>
        <Form setSpendings={setSpendings} spendings={spendings} />
        <FiltersAndOrderings
          currencyFilter={currencyFilter}
          setCurrencyFilter={setCurrencyFilter}
          ordering={ordering}
          setOrdering={setOrdering}
        />
        <SpendingList
          spendings={spendings}
          setSpendings={setSpendings}
          currencyFilter={currencyFilter}
          ordering={ordering}
        />
      </Layout>
    </>
  );
}
