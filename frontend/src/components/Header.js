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

  nav {
    margin-left: auto;
  }
`;

const FlexWrapper = styled.div`
  max-width: 800px;
  margin: 1rem auto;
  display: flex;
  align-items: center;
`;

export default function Header() {
  return (
    <>
      <HeaderStyles>
        <FlexWrapper>
          <div>
            <h1>Spendingz</h1>
          </div>
          <nav>
            <ul>
              <li>
                <a href='#0'>About</a>
              </li>
              <li>
                <a href='#0'>Pricing</a>
              </li>
              <li>
                <a href='#0'>My spendings</a>
              </li>
            </ul>
          </nav>
        </FlexWrapper>
      </HeaderStyles>
    </>
  );
}
