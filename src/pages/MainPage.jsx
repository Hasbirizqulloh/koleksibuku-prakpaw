import React from 'react';
import NavbarComponent from '../component/NavbarComponent';
import CardComponent from '../component/CardComponent';

const MainPage = () => {
  return (
    <>
      <div className="container-fluid d-flex">
        <div className="container-sm satu border border-white border-5 rounded-top-4 border-bottom-0 min-vh-100">
          <NavbarComponent />
          <div className="header">
            <div className="text-center fs-1 fw-bold pt-4 mb-5">Koleksi Buku</div>
            <CardComponent />
          </div>
        </div>
      </div>
      <div className="container-fluid d-flex ">
        <div className="container-sm dua border border-white border-5 rounded-bottom-4 border-top-0 min-vh-100 "></div>
      </div>
    </>
  );
};

export default MainPage;
