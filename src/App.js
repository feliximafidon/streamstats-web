import React, { useState, useMemo } from "react";
import { useQuery } from "react-query";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Landing from './pages/Landing';
import Login from './pages/Login';
import LoginCallback from './pages/LoginCallback';
import Stats from './pages/Stats';
import Layout from './components/Layout';
import { AppContext } from "./context";

const App = () => {
  const [alert, setAlert] = useState(null);
  const appValue = useMemo(
    () => ({ alert, setAlert }),
    [alert]
  )

  const redirect = (url) => { 
    window.location.href = url; 
    setAlert({ type: 'info', message: 'Redirecting to ' + url });
  }
  const token = window.localStorage.getItem('_token');

  const render = (content) => {
    return (
      <AppContext.Provider value={appValue}>
        <Layout>
          {content}
        </Layout>
      </AppContext.Provider>
    );
  }

  const { isLoading, error, data } = useQuery("data", async () => {
    if (window.location.pathname.startsWith('/auth/callback')) {
      // Allow to continue, without calling API
      throw new Error(0);
    }

    if (window.location.pathname === '/auth/login') {
      throw new Error(0);
    }

    if (! token || ! token.length) {
      // No need to call the API
      throw new Error(401);
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
      throw new Error('network');
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

    switch (response.status) {
      case 301:
      case 302:
        redirect(stats.redirect);
        throw new Error('redirect');
    }

    return stats;
  }, { 
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (error) {
    switch (error.message + '') {
      case '417':
        // data will be null
        break;
      case 'network':
        setAlert({ type: 'warning', message: 'You may have connectivity issues. Please try again.'});
        break;
      case '401':
        redirect('/auth/login');
      case 'redirect':
        // setAlert({ type: 'info', message: 'Redirecting to login...' });
        break;
      case '0':
      default:
        // Continue
    }
  }

  if (isLoading) {
    return render(<Landing />);
  }

  if (window.location.pathname == '/') {
    redirect('/stats/dashboard');
  }

  return render(
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth/login" element={<Login redirect={redirect} />} />
      <Route path="/auth/callback/twitch" element={<LoginCallback />} />
      <Route path="/stats/:topic" element={<Stats stats={data?.data} redirect={redirect} />} />
    </Routes>
  );
};

export default App;
