import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.util';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prevFormFields) => ({ ...prevFormFields, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      // create firebase authentication user
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      if (user) {
        // save auth user to our users collection on the database
        await createUserDocumentFromAuth(user, { displayName });

        // reset form fields
        resetFormFields();
      }
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use': {
          alert('Email already in used');
          break;
        }
        default: {
          console.log('Error on creating a user', err);
        }
      }
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Name'
          type='text'
          name='displayName'
          required
          value={displayName}
          onChange={handleChange}
        />
        <FormInput
          label='Email'
          type='email'
          name='email'
          required
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label='Password'
          type='password'
          name='password'
          required
          value={password}
          onChange={handleChange}
        />
        <FormInput
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          required
          value={confirmPassword}
          onChange={handleChange}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign Up</Button>
          <Button buttonType={BUTTON_TYPE_CLASSES.google}>
            Google Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
