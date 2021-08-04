import React from 'react';
import styled from 'styled-components';
import { SiDjango, SiGithub } from 'react-icons/si';

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
    line-height: 0;
    transition: all 0.1s;
  }

  li {
    font-weight: 500;
    border-bottom: 2px solid transparent;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    line-height: 1;
    padding: 12px 16px 8px;
    border-radius: 8px;
    transition: all 0.1s;

    svg {
      margin-top: -1px;
      width: 20px;
      height: 20px;
      transition: all 0.1s;
    }
  }

  li:hover {
    background-color: #f4f7fd;
    cursor: pointer;

    svg {
      color: var(--color-blue);
    }
  }

  a:hover {
    color: var(--color-blue);
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
              <a
                href='https://github.com/nemethricsi/spendings'
                target='_blank'
                rel='noopener noreferrer'
              >
                <li>
                  <SiGithub />
                  GitHub
                </li>
              </a>
              <a
                href='https://spendings-django.herokuapp.com/api'
                target='_blank'
                rel='noopener noreferrer'
              >
                <li>
                  <SiDjango />
                  REST Api
                </li>
              </a>
            </ul>
          </NavStyles>
        </FlexWrapper>
      </HeaderStyles>
    </>
  );
}
