import { Outlet, Route, Routes } from 'react-router-dom';

import Home from './pages/home/home.component';

const Navigation = () => {
  return (
    <div>
      <div>
        <h1>Navigation bar</h1>
      </div>
      <Outlet />
    </div>
  );
};

const Shop = () => {
  return <p>Shop Page</p>;
};

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
      </Route>
    </Routes>
  );
};

export default App;
