import React from 'react';
import styled from 'styled-components';

const HeaderStyles = styled.header`
  margin-bottom: 4rem;
  font-family: 'Montserrat', 'Poppins', var(--font-family);

  ul {
    list-style-type: none;
    display: flex;
    gap: 5rem;
    text-transform: uppercase;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  li {
    border-bottom: 2px solid transparent;
  }

  li:hover {
    border-bottom: 2px solid;
  }
  @media (max-width: 756px) {
    margin-bottom: 2rem;
  }
`;

const FlexWrapper = styled.div`
  max-width: 800px;
  margin: 1rem auto;
  display: flex;
  align-items: center;

  @media (max-width: 756px) {
    justify-content: center;
  }
`;

const LogoStyles = styled.div``;

const NavStyles = styled.nav`
  margin-left: auto;

  @media (max-width: 756px) {
    display: none;
  }
`;

export default function Header() {
  return (
    <>
      <HeaderStyles>
        <FlexWrapper>
          <LogoStyles>
            <h1>Spendingz</h1>
          </LogoStyles>
          <NavStyles>
            <ul>
              <li>
                <a href='#0'>About</a>
              </li>
              <li>
                <a
                  href='https://spendings-django.herokuapp.com/api'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  REST Api Admin
                </a>
              </li>
            </ul>
          </NavStyles>
        </FlexWrapper>
      </HeaderStyles>
    </>
  );
}
