import {Link, useLocation} from 'react-router-dom';

import { ReactComponent as Burger } from '../asset/image/burger.svg';

function Login() {
    return(
        <div className="article" style={{ gap: 405 }}>
        <div className="box-col gap20">
            <h4 style={{ lineHeight: '18px' }}>시작하기</h4>
            <h1 className="var-primary">음식 나눔으로 행복을 나누세요</h1>
            <h3 style={{ lineHeight: '24px' }}>
                152번의 나눔으로 채운 오늘,<br />
                내일은 더 많아질 거예요!
            </h3>
        </div>
        <div className="landing-container">
            <Burger />
        </div>
        <div className="box-col gap10">
          <Link to="/signup" className={`btn-fill btn-primary`}>
            시작하기
          </Link>
          <Link to="/signin" className={`btn-fill btn-line`}>
            계정이 이미 있어요
          </Link>
        </div>
        </div>
    );
}

export default Login;
