import React from 'react';
import styled from 'styled-components';

const ButtonGroupStyles = styled.div`
  ul {
    list-style-type: none;
    display: flex;
    padding: 0;
    justify-content: flex-end;
    gap: 1rem;
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

export default function CurrencyFilter({ currencyFilter, setCurrencyFilter }) {
  function handleCurrencyChange(e) {
    setCurrencyFilter(e.target.name);
  }

  return (
    <>
      <ButtonGroupStyles>
        <ul>
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
        </ul>
      </ButtonGroupStyles>
    </>
  );
}
