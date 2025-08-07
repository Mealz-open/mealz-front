

function Profile() {
    return(
        <>
            <div className="box-profile">
                <img className='img-profile' src='' />
                <h2>기부자</h2>
                <h4>서울 광진구 냥냥동</h4>
                <div className="btn-group">
                    <div className="btn-catag-small">도시락</div>
                    <div className="btn-catag-small">한식</div>
                    <div className="btn-catag-small">음료</div>
                </div>
            </div>  
            <div className="article">
                <div className="card-row">
                    <button className="">내 기부 내역</button>
                    <vr/>
                    <button className="">ESG 레포트</button>
                    <button className="">매장 프로필</button>
                </div>
            </div>
            <div className="article">
                <div className="card-col">
                    
                </div>
            </div>
        </>
    );
}

export default Profile;
