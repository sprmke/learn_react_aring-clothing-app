import { Route, Routes } from 'react-router-dom';

import Home from './pages/home/home.component';
import Navigation from './pages/navigation/navigation.component';
import Shop from './pages/shop/shop.component';
import Authentication from './pages/authentication/authentication.component';
import Checkout from './pages/checkout/checkout.component';

const App = () => {
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
