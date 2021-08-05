import React from 'react';
import styled from 'styled-components';

const FiltersWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;

  @media (max-width: 756px) {
    flex-direction: column;
  }
`;

const CurrencyFilters = styled.ul`
  list-style-type: none;
  display: flex;
  padding: 0;
  gap: 1rem;
  margin-left: auto;

  @media (max-width: 756px) {
    margin-left: unset;
  }
`;

const CurrencyButton = styled.button`
  border: none;
  font-family: var(--font-family);
  font-size: 20px;
  cursor: pointer;
  background-color: ${(p) =>
    p.name === p.currencyFilter ? '#d1e7fb' : 'var(--color-white)'};
  color: ${(p) =>
    p.name === p.currencyFilter ? 'var(--color-blue)' : 'inherit'};
  font-weight: ${(p) => (p.name === p.currencyFilter ? '700' : '400')};
  border-radius: 8px;
  padding: 6px 12px;
  /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; */
`;

const Orderings = styled.div`
  display: flex;
  align-items: center;

  select {
    appearance: none;
    border: none;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    cursor: inherit;
    line-height: inherit;

    padding: 10px;
    font-family: var(--font-family);
    font-size: 18px;
    border-radius: 8px;
    border: 1px solid darkgray;
    /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; */
  }
`;

export default function CurrencyFilter({
  currencyFilter,
  setCurrencyFilter,
  ordering,
  setOrdering,
}) {
  function handleCurrencyChange(e) {
    setCurrencyFilter(e.target.name);
  }

  return (
    <>
      <FiltersWrapper>
        <Orderings onChange={(e) => setOrdering(e.target.value)}>
          <select>
            <option value='-date'>Sort by Date descending (default)</option>
            <option value='date'>Sort by Date ascending</option>
            <option value='-amount_in_huf'>Sort by Amount descending</option>
            <option value='amount_in_huf'>Sort by Amount ascending</option>
          </select>
        </Orderings>
        <CurrencyFilters>
          <li>
            <CurrencyButton
              name=''
              onClick={handleCurrencyChange}
              currencyFilter={currencyFilter}
            >
              ALL
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              name='HUF'
              onClick={handleCurrencyChange}
              currencyFilter={currencyFilter}
            >
              HUF
            </CurrencyButton>
          </li>
          <li>
            <CurrencyButton
              name='USD'
              onClick={handleCurrencyChange}
              currencyFilter={currencyFilter}
            >
              USD
            </CurrencyButton>
          </li>
        </CurrencyFilters>
      </FiltersWrapper>
    </>
  );
}
