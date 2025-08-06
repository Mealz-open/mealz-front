import { Routes, Route, useSearchParams } from 'react-router-dom';
import PrivateRoute from './asset/check-login.js';

import './App.css';
import TOPLocation from './asset/top-location.js';
import TOPTitle from './asset/top-title.js';
import TOPSearch from './asset/top-search.js';
import GNB from './asset/gnb.js';

import Home from './page/home.js';
import Search from './page/search.js';
import Like from './page/like.js';
import Profile from './page/profile.js';
import Login from './page/login.js';
import SignUp from './page/signup.js';
import SignIn from './page/signin.js';
import FoodType from './page/foodtype.js';
import Item from './page/item.js';

function App() {
  const [searchParams] = useSearchParams();
  const foodType = searchParams.get('type');
  const foodId = searchParams.get('name');

  return (
    <>
    <Routes>
      <Route path="/" element={<TOPLocation />} />
      <Route path="/search" element={<TOPSearch />} />
      <Route path="/foodtype" element={<TOPTitle title={foodType || ''} />} />
      <Route path="/item" element={<TOPTitle title={foodId || ''} />} />
      <Route path="/like" element={<TOPTitle title={'즐겨찾기'} />} />
    </Routes>
    
    <div class="main-contents">
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/like" element={<Like />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/foodtype" element={<FoodType />} />
      <Route path="/item" element={<Item />} />

    </Routes>
    </div>

    <Routes>
      <Route path="*" element={<GNB />} />
      <Route path="/login" element={''} />
      <Route path="/signup" element={''} />
      <Route path="/signin" element={''} />
    </Routes>

    <Routes>
      <Route path="/profile" element={<PrivateRoute />} />
      <Route path="/signup" element={''} />
      <Route path="/signin" element={''} />
    </Routes>
  </>
  );
}

export default App;
