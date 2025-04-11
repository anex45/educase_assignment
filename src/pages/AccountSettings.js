import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import authService from '../services/authService';

const AccountContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0;
  background-color: white;
  min-height: 100vh;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.div`
  padding: 24px 20px;
  border-bottom: 1px solid #eee;
  background-color: #fafafa;
`;

const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 0;
  font-weight: 600;
  color: #333;
`;

const ProfileSection = styled.div`
  padding: 24px 20px;
  display: flex;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  align-items: center;
`;

const ProfileImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 24px;
  position: relative;
  border: 3px solid #f0f0f0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Badge = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 24px;
  height: 24px;
  background-color: #6c25ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border: 2px solid white;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Name = styled.h2`
  font-size: 22px;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
`;

const Email = styled.p`
  color: #666;
  margin-bottom: 0;
  font-size: 15px;
  display: flex;
  align-items: center;
  
  &:before {
    content: '✉';
    margin-right: 8px;
    color: #6c25ff;
    font-size: 14px;
  }
`;

const Bio = styled.p`
  padding: 24px 20px;
  color: #555;
  line-height: 1.6;
  font-size: 15px;
  background-color: #fafafa;
  border-bottom: 1px solid #eee;
  margin: 0;
`;

const ButtonContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const LogoutButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 30px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(244, 67, 54, 0.3);
  
  &:hover {
    background-color: #d32f2f;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(244, 67, 54, 0.4);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(244, 67, 54, 0.3);
  }
`;

const AccountSettings = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/');
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <AccountContainer>
      <Header>
        <Title>Account Settings</Title>
      </Header>
      
      <ProfileSection>
        <ProfileImage>
          <Image src={`https://ui-avatars.com/api/?name=${user.name}&background=random&size=200`} alt={user.name} />
          <Badge>✓</Badge>
        </ProfileImage>
        
        <ProfileInfo>
          <Name>{user.name}</Name>
          <Email>{user.email}</Email>
        </ProfileInfo>
      </ProfileSection>
      
      <Bio>
        Lorem ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Diam Nonummy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquam erat, Sed Diam
      </Bio>
      
      <ButtonContainer>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </ButtonContainer>
    </AccountContainer>
  );
};

export default AccountSettings;