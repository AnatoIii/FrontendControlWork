import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/header/Header';
import BlogPage from './Components/blog-page/BlogPage';
import Modal from 'react-modal';

Modal.setAppElement('#modalElement')

function App() {
  return (
    <div className="App">
      <Header />
      <BlogPage />
    </div>
  );
}

export default App;
