import React from 'react';
import { Container } from 'react-bootstrap';
import { Person, Search } from 'react-bootstrap-icons';
import './styles.css';

function Header() {
  return (
    <Container className="py-3" id="topHeader">
      <div className="topHeaderContainer">
        <div className="topHeaderLeft">
          <div className="mx-2">Consumer</div>
          <div className="mx-2">Business</div>
          <div className="mx-2">Corporate</div>
          <div className="mx-2">Our Brands</div>
        </div>
        <div className="topHeaderRight">
          <div>
            <Search color="white" className="mx-2" />
            Search
          </div>
          <div>
            <Person color="white" className="mx-2" size={25} />
            Login
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Header;
