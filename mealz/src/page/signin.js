import {Link, useLocation} from 'react-router-dom';

import { ReactComponent as Burger } from '../asset/image/burger.svg';
import Kakao from '../asset/image/kakao_symbol.png';
import { ReactComponent as Naver } from '../asset/image/naver_symbol.svg';

function SignIn() {
    return(
        <div className="article" style={{ gap: 405 }}>
        <div className="box-col gap20">
            <h4>로그인</h4>
            <h1 className="var-primary" style={{ lineHeight: '30px' }}>돌아오신 것을 환형합니다</h1>
            <h3 style={{ lineHeight: '24px' }}>
                기존에 가입한 계정으로 로그인해주세요
            </h3>
        </div>
        <div class="landing-container">
            <Burger />
        </div>
        <div class="box-col gap10">
          <Link to="http://13.209.241.224:8087/oauth2/authorization/kakao" className={`btn-fill gap12`} id='kakao'>
            <img src={Kakao} className='social-logo-img'/>
            카카오로 로그인
          </Link>
          <Link to="http://13.209.241.224:8087/oauth2/authorization/naver" className={`btn-fill gap12`} id='naver'>
            <Naver className='social-logo-img'/>
            네이버로 로그인
          </Link>
        </div>
        </div>
    );
}

export default SignIn;
