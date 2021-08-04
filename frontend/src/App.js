import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import Form from './components/Form';
import CurrencyFilter from './components/CurrencyFilter';
import SpendingList from './components/SpendingList';

export const MainContainer = styled.main`
  max-width: 800px;
  margin: 1rem auto;
`;

export default function App() {
  const [refresh, setRefresh] = useState(false);
  const [spendings, setSpendings] = useState([]);
  const [currencyFilter, setCurrencyFilter] = useState('');

  function toggleRefresh() {
    setRefresh(!refresh);
  }

  return (
    <>
      <Header />
      <MainContainer>
        <Form
          setSpendings={setSpendings}
          spendings={spendings}
          toggleRefresh={toggleRefresh}
        />
        <CurrencyFilter
          currencyFilter={currencyFilter}
          setCurrencyFilter={setCurrencyFilter}
        />
        <SpendingList
          spendings={spendings}
          setSpendings={setSpendings}
          toggleRefresh={toggleRefresh}
          refresh={refresh}
          currencyFilter={currencyFilter}
        />
      </MainContainer>
    </>
  );
}
