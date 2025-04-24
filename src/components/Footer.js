// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-4">
      <div className="container">
        <p className="mb-0">Hệ thống Nhận dạng Mống mắt &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
