import React, { useState } from "react";
import { Routes, Route, useSearchParams } from 'react-router-dom';
import PrivateRoute from './asset/check-login.js';

import './App.css';
import TOPLocation from './asset/top-location.js';
import TOPTitle from './asset/top-title.js';
import TOPSearch from './asset/top-search.js';

import Home from './page/home.js';
import Search from './page/search.js';
import SearchResult from './page/search-result.js';
import Like from './page/like.js';
import Profile from './page/profile.js';
import Login from './page/login.js';
import SignUp from './page/signup.js';
import SignIn from './page/signin.js';
import FoodType from './page/foodtype.js';
import FoodToday from "./page/foodtoday.js";
import CertifiedStores from "./page/certifiedstores.js"
import Item from './page/item.js';
import BUY from './page/buy.js';
import Shop from './page/shop.js';
import SaveEdit from './page/save-edit.js';
import Register from "./page/register.js";
import PickUp from "./page/pickup.js";
import MyShopProfile from "./page/my-shop-profile.js";
import AddMyShop from "./page/addmyshop.js";
import MyEsgReport from "./page/my-esg-repot.js";
import MyDonate from "./page/my-donate.js";

import GNB from './asset/gnb.js';

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

  return (
    <>
    <Routes>
      <Route path="*" element={<TOPLocation />} />
      <Route path="/search" element={<TOPSearch />} />
      <Route path="/searchresult" element={<TOPSearch />} />
      <Route path="/foodtype" element={<TOPTitle title={foodTypeKorean[foodType] || ''} />} />
      <Route path="/today" element={<TOPTitle title={'오늘의 나눔'} />} />
      <Route path="/certifiedstores" element={<TOPTitle title={'인증 배지 보유 매장'} />} />
      <Route path="/item" element={<TOPTitle title={foodId || ''} />} />
      <Route path="/shop" element={<TOPTitle title={foodId || ''} />} />
      <Route path="/buy" element={<TOPTitle title={'신청하기'} />} />
      <Route path="/like" element={<TOPTitle title={'즐겨찾기'} />} />
      <Route path="/profile" element={<TOPTitle title={'마이페이지'} />} />
      <Route path="/editname" element={<TOPTitle title={'이름'} />} />
      <Route path="/editlocation" element={<TOPTitle title={'위치'} />} />
      <Route path="/editmembertype" element={<TOPTitle title={'회원 유형'} />} />
      <Route path="/register" element={<TOPTitle title={'물품 등록'} />} />
      <Route path="/pickup" element={<TOPTitle title={'수령 내역 조회'} />} />
      <Route path="/myshopprofile" element={<TOPTitle title={'매장 관리'} />} />
      <Route path="/addmyshop" element={<TOPTitle title={'매장 추가'} />} />
      <Route path="/myesgreport" element={<TOPTitle title={'ESG 레포트'}/>} />
      <Route path="/mydonate" element={<TOPTitle title={'내 기부 내역'} />} />
    </Routes>
    
    <div className="main-contents">
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/searchresult" element={<SearchResult />} />
      <Route path="/like" element={<Like />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/foodtype" element={<FoodType />} />
      <Route path="/today" element={<FoodToday />} />
      <Route path="/certifiedstores" element={<CertifiedStores />} />
      <Route path="/item" element={<Item />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/buy" element={<BUY />} />
      <Route path="/editname" element={<SaveEdit />} />
      <Route path="/editlocation" element={<SaveEdit />} />
      <Route path="/editmembertype" element={<SaveEdit />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pickup" element={<PickUp />} />
      <Route path="/myshopprofile" element={<MyShopProfile />} />
      <Route path="/addmyshop" element={<AddMyShop />} />
      <Route path="/myesgreport" element={<MyEsgReport />} />
      <Route path="/mydonate" element={<MyDonate />} />
    </Routes>
    </div>

    <Routes>
      <Route path="*" element={<GNB />} />
      <Route path="/login" element={''} />
      <Route path="/signup" element={''} />
      <Route path="/signin" element={''} />
      <Route path="/editname" element={''} />
      <Route path="/editlocation" element={''} />
      <Route path="/editmembertype" element={''} />
      <Route path="/register" element={''} />
      <Route path="/buy" element={''} />
      <Route path="/item" element={''} />
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
