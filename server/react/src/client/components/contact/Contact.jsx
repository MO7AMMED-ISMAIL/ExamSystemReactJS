import React from 'react';
import './Contact.css';
import Sidebar from '../../layouts/Sidebar';
import { EnvelopeFill, TelephoneFill, GeoAltFill } from 'react-bootstrap-icons'; 

const Contact = () => {
  return (
    <div className="container-fluid">
      <div className="row mx-5">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-8">
          <h2 className="contact-title text-center my-5 bg-info text-light">Contact Us</h2>
          <div className="contact-content text-center">
            <p className="contact-card">
              Feel free to contact us if you have any questions, feedback, or inquiries. Our team is here to assist you and provide support.<br/>
              <EnvelopeFill /> Email: contact@example.com &nbsp;&nbsp; <TelephoneFill /> Phone: +123 456 7890<br/>
              <GeoAltFill /> Address: 123 Street, City, Country<br/>
              We look forward to hearing from you!<br/>
              <strong className="text-center">Thank you for reaching out!</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

