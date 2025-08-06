import { ReactComponent as Gold } from './icon/icon-gold.svg';
import { ReactComponent as Silver } from './icon/icon-silver.svg';
import { ReactComponent as Bronze } from './icon/icon-bronze.svg';

function CertAll() {
    return(
        <div className="article">
          <div className="box-col gap10">
            <div className="card-row">
                <div className="cert-badge">
                    <Gold />
                </div>
                <div className="box-col gap5">
                    <h4>동네 떡볶이</h4>
                    <div className="box-row gap5"><h5>누적 나눔 횟수</h5><h5 className="var-primary">87</h5></div>
                </div>
            </div>
            <div className="card-row">
                <div className="cert-badge">
                    <Silver />
                </div>
                <div className="box-col gap5">
                    <h4>동네 떡볶이</h4>
                    <div className="box-row gap5"><h5>누적 나눔 횟수</h5><h5 className="var-primary">80</h5></div>
                </div>
            </div>
            <div className="card-row">
                <div className="cert-badge">
                    <Bronze />
                </div>
                <div className="box-col gap5">
                    <h4>동네 떡볶이</h4>
                    <div className="box-row gap5"><h5>누적 나눔 횟수</h5><h5 className="var-primary">60</h5></div>
                </div>
            </div>
            <div className="card-row">
                <div className="cert-badge">
                    <Bronze />
                </div>
                <div className="box-col gap5">
                    <h4>동네 떡볶이</h4>
                    <div className="box-row gap5"><h5>누적 나눔 횟수</h5><h5 className="var-primary">60</h5></div>
                </div>
            </div>
            <div className="card-row">
                <div className="cert-badge">
                    <Bronze />
                </div>
                <div className="box-col gap5">
                    <h4>동네 떡볶이</h4>
                    <div className="box-row gap5"><h5>누적 나눔 횟수</h5><h5 className="var-primary">60</h5></div>
                </div>
            </div>
            <div className="card-row">
                <div className="cert-badge">
                    <Bronze />
                </div>
                <div className="box-col gap5">
                    <h4>동네 떡볶이</h4>
                    <div className="box-row gap5"><h5>누적 나눔 횟수</h5><h5 className="var-primary">60</h5></div>
                </div>
            </div>
          </div>
        </div>
    )
}

export default CertAll;