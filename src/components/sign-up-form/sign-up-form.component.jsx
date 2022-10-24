import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.util';

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

      // save auth user to our users collection on the database
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert('Email already in used');
      } else {
        console.log('Error on creating a user', err);
      }
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <div>
      <h1>Sign up with email and password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='displayName'>Name</label>
        <input
          type='text'
          name='displayName'
          required
          value={displayName}
          onChange={handleChange}
        />
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          required
          value={email}
          onChange={handleChange}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          required
          value={password}
          onChange={handleChange}
        />
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          type='password'
          name='confirmPassword'
          required
          value={confirmPassword}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default SignUpForm;
