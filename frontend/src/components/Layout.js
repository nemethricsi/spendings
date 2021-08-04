import React from 'react';
import styled from 'styled-components';
import Header from './Header';

export const MainContainer = styled.main`
  max-width: 800px;
  margin: 1rem auto;
`;

const Layout = ({ children }) => (
  <>
    <Header />
    <MainContainer>{children}</MainContainer>
  </>
);

export default Layout;
