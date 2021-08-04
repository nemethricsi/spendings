import React, { useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { InputStyles } from '../styles/InputStyles';
import { SelectStyles } from '../styles/SelectStyles';
import config from '../config';

const Wrapper = styled.div`
  max-width: 450px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function UpdateForm({ spending }) {
  const history = useHistory();
  const [state, setState] = useState({
    description: spending.description,
    amount: spending.amount,
    currency: spending.currency,
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
    const body = {
      description: state.description,
      amount: state.amount,
      currency: state.currency,
    };
    fetch(`${config.API_URL}${spending.id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        const body = res.json();
        return {
          status: res.status,
          body,
        };
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Update successful!');
          history.push('/');
        }
      });
  }

  return (
    <>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <InputStyles
            type='text'
            name='description'
            value={state.description}
            onChange={handleChange}
            autoFocus
          />
          <InputStyles
            type='number'
            name='amount'
            value={Number.parseFloat(state.amount / 100)}
            onChange={handleChange}
            disabled
          />
          <SelectStyles
            name='currency'
            value={state.currency}
            onChange={handleChange}
          >
            <option>HUF</option>
            <option>USD</option>
          </SelectStyles>
          <InputStyles type='submit' />
        </Form>
      </Wrapper>
    </>
  );
}
