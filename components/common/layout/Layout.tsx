import React from 'react';
import { Footer } from '../footer/Footer';
import { Header } from '../header/Header';

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
