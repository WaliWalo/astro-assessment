import React from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import { Facebook, Twitter, Whatsapp } from 'react-bootstrap-icons';
import './styles.css';

function Footer() {
  return (
    <div id="footerContainer">
      <Row className="footerTop">
        <Col>
          <strong className="mb-2">Product & Services</strong>
          <span>Packs & Subscriptions</span>
          <span>NJOI Prepaid</span>
          <span>TV Guides</span>
          <span>Promotions</span>
          <span>Contact Us</span>
        </Col>
        <Col>
          <strong>About Astro</strong>
          <span>Astro Malaysia Holdings</span>
          <span>Astro Kasih</span>
          <span>Media Room</span>
          <span>Careers</span>
          <span>Business Partner</span>
        </Col>
        <Col>
          <strong>Astro Businesses</strong>
          <span>Astro Go Shop</span>
          <span>Astro Radio</span>
          <span>Astro Productions</span>
          <span>Content Distribution</span>
        </Col>
        <Col>
          <strong>Redress Your Complaints</strong>
          <Image src="https://acm-assets.eco.astro.com.my/images/cfm.png" />
        </Col>
        <Col>
          <strong>Call us or WhatsApp ‘Hi’ to +123456789</strong>
          <div className="socialIcons">
            <div>
              <Whatsapp />
            </div>
            <div>
              <Facebook />
            </div>
            <div>
              <Twitter />
            </div>
          </div>
        </Col>
      </Row>
      <hr></hr>
      <Row className="mt-3">
        <Col>Privacy | Terms | General Terms & Conditions</Col>
        <Col>
          © 2021 MEASAT Broadcast Network Systems Sdn Bhd 199201008561
          (240064-A). All Rights Reserved.
        </Col>
      </Row>
    </div>
  );
}

export default Footer;
