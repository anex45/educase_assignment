import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import hummingbirdImage from '../assets/images/hummingbird.jpg';

const WelcomeContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0;
  background-color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ImageBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${hummingbirdImage});
  background-size: cover;
  background-position: center;
  filter: brightness(0.8);
  z-index: 1;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  padding: 20px;
  margin-top: auto;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
  text-align: center;
  color: white;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Description = styled.p`
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 30px;
  text-align: center;
  font-size: 16px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const ButtonContainer = styled.div`
  width: 100%;
  max-width: 300px;
  margin-bottom: 40px;
`;

const CreateButton = styled.button`
  background-color: #6c25ff;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 16px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 15px;
  width: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: #5a1ee0;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const LoginLink = styled(Link)`
  display: block;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  text-decoration: none;
  text-align: center;
  border-radius: 30px;
  padding: 16px;
  font-size: 16px;
  font-weight: 500;
  width: 100%;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const StatusBar = styled.div`
  position: relative;
  z-index: 3;
  height: 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
  color: white;
  font-size: 12px;
`;

const Welcome = () => {
  return (
    <WelcomeContainer>
      <ImageBackground />
      <StatusBar>
        <span>9:41</span>
        <div>
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </StatusBar>
      
      <ContentContainer>
        <Title>Welcome to PopX</Title>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Description>
        
        <ButtonContainer>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <CreateButton>Create Account</CreateButton>
          </Link>
          
          <LoginLink to="/login">Already Registered? Login</LoginLink>
        </ButtonContainer>
      </ContentContainer>
    </WelcomeContainer>
  );
};

export default Welcome;