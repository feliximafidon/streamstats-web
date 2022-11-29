import React from "react";
import { useQuery } from "react-query";
import { Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Landing from './pages/Landing';
import Login from './pages/Login';
import LoginCallback from './pages/LoginCallback';
import Stats from './pages/Stats';
import Layout from './components/Layout';

const App = ({token}) => {
  const { isLoading, error, data } = useQuery("stats", async () => {
    if (window.location.pathname.startsWith('/auth/callback')) {
      return {};
    }

    let response = null;
    let stats = null;

    try {
      response = await fetch(process.env.REACT_APP_API_ROOT + '/api/stats', {
        headers: new Headers({
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        })
      });

      stats = await response.json();
    } catch (e) {
      // Network error
      throw new Error('Network error');
    }

    if (! response.ok) {
      switch (response.status) {
        case 401:
        case 417:
          throw new Error(response.status);
        default:
          throw new Error(0);
      }
    }

    return stats;
  }, { retry: false });

  if (error) {
    switch (error.message + '') {
      case '401':
        if (window.location.pathname !== '/auth/login') {
          window.location.href = '/auth/login';
          return;
        }
      default:
        // Continue
    }
  }

  if (isLoading) {
    return <Layout><Landing /></Layout>
  }

  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/callback/twitch" element={<LoginCallback />} />
          <Route path="/stats" element={<Stats data={data} />} />
        </Routes>
      </Layout>

    </div>
  );
};

export default App;
