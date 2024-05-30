import React from 'react';
import './About.css';
import Sidebar from '../../layouts/Sidebar';

const About = () => {
  return (
    <div className="container-fluid">
      <div className="row mx-5">
        <div className="col-md-2">
          <Sidebar />
        </div>
        <div className="col-md-8">
          <h2 className="about-title text-center my-5 bg-info text-light">About Us</h2>
          <div className="about-content text-center">
            <p className="about-card">
              Welcome to our website! We aim to provide valuable information and services to our students.<br/>
              At our website, you can find a wide range of educational resources, including quizzes, and more.<br />
              Our mission is to empower students to grow by providing them with high-quality educational content <br/>
              Whether you're a student looking to improve your skills, a teacher seeking teaching materials<br/>
              Feel free to explore our website and discover all that we have to offer.<br/>
               <strong className="text-center">Thank you for visiting!</strong> 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

