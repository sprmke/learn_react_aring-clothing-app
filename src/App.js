import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from './utils/firebase/firebase.util';
import Home from './pages/home/home.component';
import Navigation from './pages/navigation/navigation.component';
import Shop from './pages/shop/shop.component';
import Authentication from './pages/authentication/authentication.component';
import Checkout from './pages/checkout/checkout.component';
import { setCurrentUser } from './store/user/user.action';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        // save auth user to our users collection on the database
        await createUserDocumentFromAuth(user);
      }

      // save auth user to user context
      dispatch(setCurrentUser(user));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
