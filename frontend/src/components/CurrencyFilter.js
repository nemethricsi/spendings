import React from 'react';
import styled from 'styled-components';

const ButtonGroupStyles = styled.div`
  ul {
    list-style-type: none;
  }

  button {
    background-color: ${(p) => (p.currencyFilter === 'USD' ? 'red' : '')};
  }
`;

export default function CurrencyFilter({ currencyFilter, setCurrencyFilter }) {
  function handleCurrencyChange(e) {
    setCurrencyFilter(e.target.name);
  }

  return (
    <>
      <ButtonGroupStyles currencyFilter={currencyFilter}>
        <ul>
          <li>
            <button name='' onClick={handleCurrencyChange}>
              ALL
            </button>
          </li>
          <li>
            <button name='HUF' onClick={handleCurrencyChange}>
              HUF
            </button>
          </li>
          <li>
            <button name='USD' onClick={handleCurrencyChange}>
              USD
            </button>
          </li>
        </ul>
      </ButtonGroupStyles>
    </>
  );
}
