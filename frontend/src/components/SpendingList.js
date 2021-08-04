import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiCoffee, FiShoppingBag, FiDollarSign } from 'react-icons/fi';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { BiEditAlt } from 'react-icons/bi';
import { DateTime } from 'luxon';
import { toast, Slide } from 'react-toastify';
import Loader from './Loader';

const url = 'https://spendings-django.herokuapp.com/api/spendings/';

const SpendingListStyles = styled.div`
  // border: 1px solid rebeccapurple;
`;

const Spending = styled.article`
  border-radius: 8px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  padding: 1.5rem;
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;

  h3,
  p {
    margin: 0;
  }

  h3 {
    line-height: 1.4;
  }

  p {
    color: #adadad;
  }
  @media (max-width: 756px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const IconWrapper = styled.div`
  padding: 8px;
  line-height: 0;
  background-color: #d1e7fb;
  border-radius: 12px;
  margin-right: 1.5rem;

  svg {
    width: 28px;
    height: 28px;
  }

  @media (max-width: 756px) {
    margin: 0;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const TextWrapper = styled.div`
  @media (max-width: 756px) {
    text-align: center;
    margin: 0.5rem 0;
  }
`;

const AmountWrapper = styled.div`
  margin-left: auto;
  margin-right: 1rem;

  @media (max-width: 756px) {
    margin: 0.5rem 0;
  }
`;

const Amount = styled.h3`
  &::before {
    content: '${(props) => (props.currency === 'USD' ? '$' : '')}';
  }

  &::after {
    content: '${(props) => (props.currency === 'HUF' ? ' HUF' : '')}';
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const TimesWrapper = styled.div`
  padding: 10px;
  line-height: 0;
  border-radius: 25%;
  background-color: #f4f7fd;
  cursor: pointer;
  transition: background-color 0.2s;

  svg {
    color: #b4b8c3;
    transition: color 0.2s;
  }

  &:hover {
    background-color: #ffe7e7;
  }

  &:hover > svg {
    color: #da6a6b;
  }
`;

const EditWrapper = styled.div`
  padding: 10px;
  line-height: 0;
  border-radius: 25%;
  background-color: #f4f7fd;
  cursor: pointer;
  transition: background-color 0.2s;

  svg {
    color: #b4b8c3;
    transition: color 0.2s;
  }

  &:hover {
    background-color: #fef8e8;
  }

  &:hover > svg {
    color: #e3bb4a;
  }
`;

export default function SpendingList({
  refresh,
  toggleRefresh,
  spendings,
  setSpendings,
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async (res) => {
        const body = await res.json();
        return {
          status: res.status,
          body,
        };
      })
      .then((response) => {
        if (response.status === 200) {
          setSpendings(response.body);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [refresh]);

  function handleDelete(spendingId) {
    fetch(`${url}${spendingId}/`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then((res) => {
      if (res.status === 204) {
        toast.success(`Spending was successfully deleted`, {
          position: 'top-center',
          autoClose: 2000,
          transition: Slide,
        });
        const updated = spendings.filter(
          (spending) => spending.id !== spendingId
        );
        setSpendings(updated);
      } else {
        toast.error(`Something went wrong. please try again`, {
          position: 'top-center',
          autoClose: 2000,
          transition: Slide,
        });
      }
    });
  }

  if (loading) return <Loader />;

  return (
    <>
      <SpendingListStyles>
        {!spendings.length && <h1>No spendings!</h1>}
        {spendings.length > 0 &&
          spendings.map((spending) => (
            <Spending key={spending.id}>
              <IconWrapper>
                <FiDollarSign color='var(--color-blue)' />
              </IconWrapper>
              <TextWrapper>
                <h3>{spending.description}</h3>
                <p>
                  {DateTime.fromISO(spending.date).toFormat(
                    't - MMMM dd, yyyy'
                  )}
                </p>
              </TextWrapper>
              <AmountWrapper>
                <Amount currency={spending.currency}>
                  {Number.parseFloat(spending.amount).toFixed(2)}
                </Amount>
              </AmountWrapper>
              <ActionsWrapper>
                <EditWrapper role='button' tabIndex={0}>
                  <BiEditAlt size={18} />
                </EditWrapper>
                <TimesWrapper
                  role='button'
                  tabIndex={0}
                  onClick={() => handleDelete(spending.id)}
                >
                  <FaTimes size={18} />
                </TimesWrapper>
              </ActionsWrapper>
            </Spending>
          ))}
      </SpendingListStyles>
    </>
  );
}
