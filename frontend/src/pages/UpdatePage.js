import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useParams } from 'react-router-dom';
import config from '../config';
import Loader from '../components/Loader';
import UpdateForm from '../components/UpdateForm';

export default function UpdatePage() {
  const { spendingId } = useParams();
  const [loading, setLoading] = useState(true);
  const [spending, setSpending] = useState(null);

  useEffect(() => {
    fetch(`${config.API_URL}${spendingId}/`, {
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
          setSpending(response.body);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [spendingId]);

  return (
    <>
      <Layout>
        {loading && <Loader />}
        {!loading && <UpdateForm spending={spending} />}
      </Layout>
    </>
  );
}
