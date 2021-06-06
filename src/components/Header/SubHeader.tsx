import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
  Image,
} from 'react-bootstrap';
import './styles.css';
import { useAppDispatch } from '../../store/setup/store';
import { search } from './../../utilities/filters';
import { setChannels } from '../../store/channel/channelSlice';

function SubHeader() {
  const dispatch = useAppDispatch();

  const searchFunction = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
    const filtered = await search(e.currentTarget.value);
    if (filtered !== undefined) {
      dispatch(setChannels(filtered));
    }
  };

  return (
    <Container>
      <Navbar bg="#e71959" expand="lg" className="headerNavbar">
        <Navbar.Brand as={Link} to="/">
          <Image
            className="headerLogo"
            src="https://res.cloudinary.com/waliwalo/image/upload/v1622883653/Astro%20Assessment/whiteAstro_jmdr4z.png"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Products & Services" id="basic-nav-dropdown">
              <NavDropdown.Item>Broadband Bundle</NavDropdown.Item>
              <NavDropdown.Item>TV packages</NavDropdown.Item>
              <NavDropdown.Item>Ultra Box</NavDropdown.Item>
              <NavDropdown.Item>Multi Room</NavDropdown.Item>
              <NavDropdown.Item>Astro GO</NavDropdown.Item>
              <NavDropdown.Item>Disney+ Hotstar</NavDropdown.Item>
              <NavDropdown.Item>NJOI</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="TV Guide" id="basic-nav-dropdown">
              <NavDropdown.Item>Channels</NavDropdown.Item>
              <NavDropdown.Item>Astro First</NavDropdown.Item>
              <NavDropdown.Item>Astro Best</NavDropdown.Item>
              <NavDropdown.Item>Movies</NavDropdown.Item>
              <NavDropdown.Item>Tv Shows</NavDropdown.Item>
              <NavDropdown.Item>Kids</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>Promotions</Nav.Link>
            <NavDropdown title="My Account" id="basic-nav-dropdown">
              <NavDropdown.Item>Manage Account</NavDropdown.Item>
              <NavDropdown.Item>Pay Bills</NavDropdown.Item>
              <NavDropdown.Item>Rewards</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link>Support</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                searchFunction(e)
              }
              placeholder="Search By Name or Number"
              className="mr-sm-2"
            />
            {/* <Button variant="outline-success">Search</Button> */}
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default SubHeader;
