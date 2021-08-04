import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import config from '../config';
import { InputStyles } from '../styles/InputStyles';
import { SelectStyles } from '../styles/SelectStyles';

const FormStyles = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
`;

export default function Form({ setSpendings, spendings, toggleRefresh }) {
  const [state, setState] = useState({
    description: '',
    amount: 0,
    currency: 'USD',
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(config.API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...state,
        amount: Number.parseFloat(state.amount).toFixed(2) * 100,
      }),
    })
      .then(async (res) => {
        const body = await res.json();
        return {
          status: res.status,
          body,
        };
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          // toggleRefresh();
          const newItem = response.body;
          setSpendings([newItem, ...spendings]);
          setState({
            description: '',
            amount: 0,
            currency: 'USD',
          });
        } else {
          toast.error(JSON.stringify(response.body, null, 2));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      <FormStyles onSubmit={handleSubmit}>
        <InputStyles
          type='text'
          placeholder='description'
          name='description'
          value={state.description}
          onChange={handleChange}
        />
        <InputStyles
          type='number'
          placeholder='amount'
          name='amount'
          value={state.amount}
          onChange={handleChange}
        />
        <SelectStyles
          name='currency'
          value={state.currency}
          onChange={handleChange}
        >
          <option value='HUF'>HUF</option>
          <option value='USD'>USD</option>
        </SelectStyles>
        <InputStyles type='submit' value='Save' />
      </FormStyles>
    </>
  );
}
