import React, { useState } from 'react';

//🔑 In the component where we want to execute the mutation, we import the mutation we created as well as the useMutation Hook:
// Import the `useMutation()` hook from Apollo Client
import { useMutation } from '@apollo/client';
// Import the GraphQL mutation
import { LOGIN_USER } from '../../utils/mutations';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Invoke `useMutation()` hook to return a Promise-based function and data about the ADD_PROFILE mutation
  // 🔑 Next, we apply the useMutation Hook to return a mutation function that we can use to trigger the mutation as needed:
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Since mutation function is async, wrap in a `try...catch` to catch any network errors from throwing due to a failed request.
    // We wrap our mutation function in a try...catch and add error handling. This will handle any errors gracefully if our request fails:
    try {
      // Execute mutation and pass in defined parameter data as variables
      const { data } = await loginUser({
        //🔑 We then assign a value to our mutation variable that represents the name entered by the user:
        variables: { 
            email,
            password},
      });
      // 🔑 Finally, we add a refresh to allow our page to reload after the mutation is executed. 
      // This will stop any cache issues and allow our new profile to be displayed:
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
<>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;