import SearchBar from '../asset/searchbar.js';
import NanumType from '../asset/nanum-type.js';
import Today from '../asset/today.js';
import Map from '../asset/map.js';
import Cert from '../asset/certified.js';

import bannerImg from '../asset/image/img-banner.png';

function Home() {
    return(
        <>
            <div className="article"><SearchBar /></div>
            <div className="carousel">
                <img src={bannerImg} />
            </div>
            <NanumType />
            <Today />
            <div className='article'>
                <div className="article-title">
                    <h3>전체 나눔 매장</h3>
                </div>
                <Map latitude={37.5665} longitude={126.978} />
            </div>
            <Cert />
        </>
    );
}

export default Home;
