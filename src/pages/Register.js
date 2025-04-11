import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import authService from '../services/authService';

const RegisterContainer = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 0;
  background-color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eee;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 0;
  font-size: 14px;
`;

const FormContainer = styled.div`
  padding: 24px;
  flex: 1;
  overflow-y: auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #6c25ff;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 15px;
  border: 2px solid ${props => props.error ? '#ff4d4f' : '#e0e0e0'};
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s;
  background-color: #f9f9f9;
  
  &:focus {
    outline: none;
    border-color: #6c25ff;
    box-shadow: 0 0 0 3px rgba(108, 37, 255, 0.1);
    background-color: #fff;
  }
`;

const ErrorText = styled.div`
  color: #ff4d4f;
  font-size: 13px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  
  &:before {
    content: "⚠️";
    margin-right: 6px;
    font-size: 12px;
  }
`;

// Replace the existing RadioGroup, RadioOption, HiddenRadio, CustomRadio, and RadioLabel components
const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 10px;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RadioLabel = styled.label`
  font-size: 16px;
  color: #333;
  cursor: pointer;
`;

const RegisterButton = styled.button`
  width: 100%;
  background-color: #6c25ff;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(108, 37, 255, 0.2);
  
  &:disabled {
    background-color: #d3d3d3;
    box-shadow: none;
    cursor: not-allowed;
  }
  
  &:not(:disabled):hover {
    background-color: #5a1ee0;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(108, 37, 255, 0.3);
  }
  
  &:not(:disabled):active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(108, 37, 255, 0.2);
  }
`;

const AlertMessage = styled.div`
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  color: #ff4d4f;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  
  &:before {
    content: "❌";
    margin-right: 10px;
    font-size: 16px;
  }
`;

const StatusBar = styled.div`
  height: 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
  color: #333;
  font-size: 12px;
  background-color: #f8f9fa;
`;

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full name is required'),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  companyName: Yup.string(),
  isAgency: Yup.string().required('Please select an option')
});

const Register = () => {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState('');
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await authService.register({
        ...values,
        isAgency: values.isAgency === 'yes'
      });
      navigate('/account');
    } catch (error) {
      setRegisterError('Registration failed. Please check your information and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <RegisterContainer>
      <StatusBar>
        <span>{currentTime}</span>
        <div>
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </StatusBar>
      
      <Header>
        <Title>Create your PopX account</Title>
        <Subtitle>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Subtitle>
      </Header>
      
      <FormContainer>
        {registerError && <AlertMessage>{registerError}</AlertMessage>}
        
        <Formik
          initialValues={{ 
            fullName: '', 
            phoneNumber: '', 
            email: '', 
            password: '', 
            companyName: '',
            isAgency: 'yes'
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid, dirty, errors, touched, values }) => (
            <Form>
              <FormGroup>
                <Label htmlFor="fullName">Full Name*</Label>
                <StyledField 
                  type="text" 
                  id="fullName" 
                  name="fullName" 
                  placeholder="Enter your full name" 
                  error={errors.fullName && touched.fullName}
                />
                <ErrorMessage name="fullName" component={ErrorText} />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="phoneNumber">Phone Number*</Label>
                <StyledField 
                  type="tel" 
                  id="phoneNumber" 
                  name="phoneNumber" 
                  placeholder="Enter your phone number" 
                  error={errors.phoneNumber && touched.phoneNumber}
                />
                <ErrorMessage name="phoneNumber" component={ErrorText} />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="email">Email Address*</Label>
                <StyledField 
                  type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Enter your email address" 
                  error={errors.email && touched.email}
                />
                <ErrorMessage name="email" component={ErrorText} />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="password">Password*</Label>
                <StyledField 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="Create a password" 
                  error={errors.password && touched.password}
                />
                <ErrorMessage name="password" component={ErrorText} />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="companyName">Company Name</Label>
                <StyledField 
                  type="text" 
                  id="companyName" 
                  name="companyName" 
                  placeholder="Enter company name (optional)" 
                  error={errors.companyName && touched.companyName}
                />
                <ErrorMessage name="companyName" component={ErrorText} />
              </FormGroup>
              
              <FormGroup>
                <Label>Are you an Agency?*</Label>
                <div role="group" aria-labelledby="agency-radio-group">
                  <RadioGroup>
                    <RadioOption>
                      <Field 
                        type="radio" 
                        id="agency-yes" 
                        name="isAgency" 
                        value="yes"
                      />
                      <RadioLabel htmlFor="agency-yes">Yes</RadioLabel>
                    </RadioOption>
                    <RadioOption>
                      <Field 
                        type="radio" 
                        id="agency-no" 
                        name="isAgency" 
                        value="no"
                      />
                      <RadioLabel htmlFor="agency-no">No</RadioLabel>
                    </RadioOption>
                  </RadioGroup>
                  <ErrorMessage name="isAgency" component={ErrorText} />
                </div>
              </FormGroup>
              
              <RegisterButton 
                type="submit" 
                disabled={isSubmitting || !(isValid && dirty)}
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </RegisterButton>
            </Form>
          )}
        </Formik>
      </FormContainer>
    </RegisterContainer>
  );
};

export default Register;