import React from 'react';
import {Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import NewsItem from "./pages/NewsItem";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main/>}>
        </Route>
        <Route path=":id" element={<NewsItem/>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
