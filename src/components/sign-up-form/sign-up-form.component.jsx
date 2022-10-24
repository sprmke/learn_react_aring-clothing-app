import { useState } from 'react';
import { createAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.util';

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

    await createAuthUserWithEmailAndPassword(email, password);
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
