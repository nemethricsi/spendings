import React, { useEffect, useState } from 'react';

export default function App() {
  const [spendings, setSpendings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, toggleRefresh] = useState(false);
  const [state, setState] = useState({
    date: new Date().toISOString(),
    description: '',
    amount: 0,
    currency: 'USD',
  });

  useEffect(() => {
    setLoading(true);
    fetch(`https://spendings-django.herokuapp.com/api/spendings/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (res) => {
        const body = await res.json();
        setLoading(false);
        return {
          status: res.status,
          body,
        };
      })
      .then((response) => {
        if (response.status === 200) {
          setSpendings(response.body);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [refresh]);

  function handleChange(e) {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  }

  function handleDelete(spendingId) {
    console.log(spendingId);
    fetch(
      `https://spendings-django.herokuapp.com/api/spendings/${spendingId}/`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    ).then((response) => {
      console.table(response);
      if (response.status === 204) {
        // toggleRefresh(!refresh);
        const updatedSpendings = spendings.filter(
          (spending) => spending.id !== spendingId
        );
        setSpendings(updatedSpendings);
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const reqBody = {
      date: new Date().toISOString(),
      description: state.description,
      amount: Number.parseFloat(state.amount).toFixed(2),
      currency: state.currency,
    };
    fetch(`https://spendings-django.herokuapp.com/api/spendings/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reqBody),
    })
      .then(async (res) => {
        const body = await res.json();
        return {
          status: res.status,
          body,
        };
      })
      .then((response) => {
        console.table(response);
        if (response.status === 201) {
          toggleRefresh(!refresh);
          console.log('success');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <h1>Spendings</h1>
      <hr />
      <h2>Add new spending</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type='text'
            value={state.description}
            onChange={handleChange}
            name='description'
          />
        </label>
        <label>
          Amount:
          <input
            type='number'
            value={state.amount}
            onChange={handleChange}
            name='amount'
          />
        </label>
        <select onChange={handleChange} value={state.currency} name='currency'>
          <option value='HUF'>HUF</option>
          <option value='USD'>USD</option>
          <option value='EUR'>EUR</option>
        </select>
        <input type='submit' />
      </form>
      <hr />
      {!spendings.length && <h1>No spendings!</h1>}
      {spendings.length > 0 &&
        spendings.map((spending) => (
          <article key={spending.id}>
            <h3>{spending.description}</h3>
            <p>{spending.amount}</p>
            <button onClick={() => handleDelete(spending.id)}>X</button>
          </article>
        ))}
    </>
  );
}
