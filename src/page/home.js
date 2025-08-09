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
            <Map />
            <Cert />
        </>
    );
}

export default Home;
