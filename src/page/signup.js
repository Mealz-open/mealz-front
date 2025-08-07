import {Link, useLocation} from 'react-router-dom';

import { ReactComponent as Burger } from '../asset/image/burger.svg';
import Kakao from '../asset/image/kakao_symbol.png';
import { ReactComponent as Naver } from '../asset/image/naver_symbol.svg';

function SignUp() {
    return(
        <div className="article" style={{ gap: 345 }}>
        <div className="box-col gap20">
            <h4 style={{ lineHeight: '18px' }}>회원가입하기</h4>
            <h1 className="var-primary" style={{ lineHeight: '30px' }}>음식 나눔으로 지속가능한<br/>내일을 만들어가요</h1>
            <h3 style={{ lineHeight: '24px' }}>
                mealz를 통해 음식을<br/>받거나 기부하려면<br/>회원가입이 필요해요
            </h3>
        </div>
        <div class="landing-container">
            <Burger />
        </div>
        <div class="box-col gap10">
          <Link to="http://13.209.241.224:8087/oauth2/authorization/kakao" className={`btn-fill gap12`} id='kakao'>
            <img src={Kakao} className='social-logo-img'/>
            카카오로 시작하기
          </Link>
          <Link to="http://13.209.241.224:8087/oauth2/authorization/naver" className={`btn-fill gap12`} id='naver'>
            <Naver className='social-logo-img'/>
            네이버로 시작하기
          </Link>
        </div>
        </div>
    );
}

export default SignUp;
