import React, { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import config from '../config';

const FormStyles = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
`;

const InputStyles = styled.input`
  font-family: var(--font-family);
  border: none;
  padding: 10px 15px;
  font-size: 18px;
  font-weight: 700;
  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  color: darkgray;

  &:focus {
    border-radius: 8px;
    color: var(--color-blue);
  }

  &[type='text'] {
    flex: 1;
  }

  &[type='number'] {
    width: 150px;
  }

  &[type='submit'] {
    background-color: #08b783;
    color: var(--color-white);
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0px);
    }
  }
`;

const SelectStyles = styled.select`
  /* A reset of styles, including removing the default dropdown arrow */
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
  font-weight: 700;
  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  min-width: 80px;
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
      body: JSON.stringify(state),
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
          toggleRefresh();
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
      <FormStyles>
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
        <InputStyles type='submit' onClick={handleSubmit} value='Save' />
      </FormStyles>
    </>
  );
}
