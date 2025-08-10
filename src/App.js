import React, { useState } from "react";
import { Routes, Route, useSearchParams } from 'react-router-dom';
import PrivateRoute from './asset/check-login.js';

import './App.css';
import TOPLocation from './asset/top-location.js';
import TOPTitle from './asset/top-title.js';
import TOPSearch from './asset/top-search.js';

import Home from './page/home.js';
import Search from './page/search.js';
import Like from './page/like.js';
import Profile from './page/profile.js';
import EditName from './page/edit-name.js';
import Login from './page/login.js';
import SignUp from './page/signup.js';
import SignIn from './page/signin.js';
import FoodType from './page/foodtype.js';
import Item from './page/item.js';
import BUY from './page/buy.js';

import GNB from './asset/gnb.js';
import SaveEdit from './asset/save-edit.js';
import BuyItem from './asset/buy-item.js';

function App() {
  const [searchParams] = useSearchParams();
  const foodType = searchParams.get('type');
  const foodId = searchParams.get('name');

  const foodTypeKorean = {
    KOREAN: "한식",
    CHINESE: "중식",
    JAPANESE: "일식",
    WESTERN: "양식",
    ASIAN: "아시안",
    SNACK:"분식",
    FAST_FOOD: "패스트푸드",
    DESSERT: "디저트",
    BEVERAGE: "음료",
    SIDE_DISH: "반찬",
    ETC: "기타"
  }

  const [editNickname, setNickname] = useState("");

  return (
    <>
    <Routes>
      <Route path="*" element={<TOPLocation />} />
      <Route path="/search" element={<TOPSearch />} />
      <Route path="/foodtype" element={<TOPTitle title={foodTypeKorean[foodType] || ''} />} />
      <Route path="/today" element={<TOPTitle title={'오늘의 나눔'} />} />
      <Route path="/item" element={<TOPTitle title={foodId || ''} />} />
      <Route path="/buy" element={<TOPTitle title={'신청하기'} />} />
      <Route path="/like" element={<TOPTitle title={'즐겨찾기'} />} />
      <Route path="/profile" element={<TOPTitle title={'마이페이지'} />} />
      <Route path="/editname" element={<TOPTitle title={'이름'} />} />
    </Routes>
    
    <div className="main-contents">
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/like" element={<Like />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/editname" element={<EditName editNickname={editNickname} setNickname={setNickname} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/foodtype" element={<FoodType />} />
      <Route path="/today" element={<FoodType />} />
      <Route path="/item" element={<Item />} />
      <Route path="/buy" element={<BUY />} />
    </Routes>
    </div>

    <Routes>
      <Route path="*" element={<GNB />} />
      <Route path="/login" element={''} />
      <Route path="/signup" element={''} />
      <Route path="/signin" element={''} />
      <Route path="/item" element={<BuyItem />} />
      <Route path="/buy" element={<BuyItem />} />
      <Route path="/editname" element={<SaveEdit editNickname={editNickname} />} />
    </Routes>

    <Routes>
      <Route path="*" element={<PrivateRoute />} />
      <Route path="/" element={''} />
      <Route path="/login" element={''} />
      <Route path="/signin" element={''} />
      <Route path="/signup" element={''} />
    </Routes>
  </>
  );
}

export default App;
