import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import imgKorean from "./image/img-korean.png";
import imgChinese from "./image/img-chinese.png";
import imgJapanese from "./image/img-japanese.png";
import imgWestern from "./image/img-western.png";
import imgAsian from "./image/img-asian.png";
import imgSnack from "./image/img-snack.png";
import imgFastfood from "./image/img-fastfood.png";
import imgDessert from "./image/img-dessert.png";
import imgBeverage from "./image/img-beverage.png";
import imgSidemenu from "./image/img-sidemenu.png";
import imgEtc from "./image/img-etc.png";

function TypeSlide () {
  const [searchParams] = useSearchParams();
  const activeType = searchParams.get("type");
  const navigate = useNavigate();

  return (
    <div className="box-row type-slide">
      <button className={`btn-menu-slide${activeType === "KOREAN" ? " active" : ""}`} onClick={()=> navigate('/foodtype?type=KOREAN')}><img src={imgKorean} /><h6>한식</h6></button>
      <button className={`btn-menu-slide${activeType === "CHINESE" ? " active" : ""}`} onClick={()=> navigate('/foodtype?type=CHINESE')}><img src={imgChinese} /><h6>중식</h6></button>
      <button className={`btn-menu-slide${activeType === "JAPANESE" ? " active" : ""}`} onClick={()=> navigate('/foodtype?type=JAPANESE')}><img src={imgJapanese} /><h6>일식</h6></button>
      <button className={`btn-menu-slide${activeType === "WESTERN" ? " active" : ""}`} onClick={()=> navigate('/foodtype?type=WESTERN')}><img src={imgWestern} /><h6>양식</h6></button>
      <button className={`btn-menu-slide${activeType === "ASIAN" ? " active" : ""}`} onClick={()=> navigate('/foodtype?type=ASIAN')}><img src={imgAsian} /><h6>아시안</h6></button>
      <button className={`btn-menu-slide${activeType === "SNACK" ? " active" : ""}`} onClick={()=> navigate('/foodtype?type=SNACK')}><img src={imgSnack} /><h6>분식</h6></button>
      <button className={`btn-menu-slide${activeType === "FAST_FOOD" ? " active" : ""}`} onClick={()=> navigate('/foodtype?type=FAST_FOOD')}><img src={imgFastfood} /><h6>패스트푸드</h6></button>
      <button className={`btn-menu-slide${activeType === "DESSERT" ? " active" : ""}`} onClick={()=> navigate('/foodtype?type=DESSERT')}><img src={imgDessert} /><h6>디저트</h6></button>
      <button className={`btn-menu-slide${activeType === "BEVERAGE" ? " active" : ""}`} onClick={()=> navigate('/foodtype?type=BEVERAGE')}><img src={imgBeverage} /><h6>음료</h6></button>
      <button className={`btn-menu-slide${activeType === "SIDE_DISH" ? " active" : ""}`} onClick={()=> navigate('/foodtype?type=SIDE_DISH')}><img src={imgSidemenu} /><h6>반찬</h6></button>
      <button className={`btn-menu-slide${activeType === "ETC" ? " active" : ""}`} onClick={()=> navigate('/foodtype?type=ETC')}><img src={imgEtc} /><h6>기타</h6></button>
    </div>
  );
}

export default TypeSlide;