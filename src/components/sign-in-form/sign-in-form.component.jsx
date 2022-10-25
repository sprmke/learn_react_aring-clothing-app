import { useState } from 'react';
import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.util';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields((prevFormFields) => ({ ...prevFormFields, [name]: value }));
  };

  const signInWithGoogle = async () => {
    // create firebase authentication user
    const { user } = await signInWithGooglePopup();

    if (user) {
      // save auth user to our users collection on the database
      createUserDocumentFromAuth(user);
    }
  };

  const signInWithEmailAndPassword = async () => {
    // sign in with firebase email and password authentication
    return await signInAuthUserWithEmailAndPassword(email, password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInWithEmailAndPassword();

      // reset form fields
      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found': {
          alert('User not found');
          break;
        }
        case 'auth/wrong-password': {
          alert('Invalid email or password');
          break;
        }
        default: {
          console.log('Error on logging a user', err);
        }
      }
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
