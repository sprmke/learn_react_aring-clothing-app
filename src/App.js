import { Route, Routes } from 'react-router-dom';

import Home from './pages/home/home.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />}>
        <Route path='shop' element={<p>Shop Page</p>} />
      </Route>
    </Routes>
  );
};

export default App;
