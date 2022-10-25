import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context';
import { ReactComponent as AppLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import { signOutAuthUser } from '../../utils/firebase/firebase.util';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    // signout user from firebase authentication
    await signOutAuthUser();

    // reset currentUser data from user context
    setCurrentUser(null);
  };

  return (
    <>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <AppLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            Shop
          </Link>
          {currentUser ? (
            <span className='nav-link' onClick={signOutHandler}>
              Sign out
            </span>
          ) : (
            <Link className='nav-link' to='/sign-in'>
              Sign In
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
