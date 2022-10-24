import { Route, Routes } from 'react-router-dom';

import Home from './pages/home/home.component';
import Navigation from './pages/navigation/navigation.component';
import SignIn from './pages/sign-in/sign-in.component';

const Shop = () => {
  return <p>Shop Page</p>;
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='sign-in' element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
