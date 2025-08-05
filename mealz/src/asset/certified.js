import { ReactComponent as Gold } from './icon/icon-gold.svg';
import { ReactComponent as Silver } from './icon/icon-silver.svg';
import { ReactComponent as Bronze } from './icon/icon-bronze.svg';

function Cert() {
    return(
        <div class="article">
          <div class="article-title">
              <h3>인증 배지 보유 매장</h3>
              <button><h5>더보기</h5></button>
          </div>
          <div class="box-col gap10">
            <div class="card-row">
                <div class="cert-badge">
                    <Gold />
                </div>
                <div class="box-col">
                    <h4>동네 떡볶이</h4>
                    <div class="box-row gap5"><h5>누적 나눔 횟수</h5><h5 class="var-primary">87</h5></div>
                </div>
            </div>
            <div class="card-row">
                <div class="cert-badge">
                    <Silver />
                </div>
                <div class="box-col">
                    <h4>동네 떡볶이</h4>
                    <div class="box-row gap5"><h5>누적 나눔 횟수</h5><h5 class="var-primary">80</h5></div>
                </div>
            </div>
            <div class="card-row">
                <div class="cert-badge">
                    <Bronze />
                </div>
                <div class="box-col">
                    <h4>동네 떡볶이</h4>
                    <div class="box-row gap5"><h5>누적 나눔 횟수</h5><h5 class="var-primary">60</h5></div>
                </div>
            </div>
          </div>
        </div>
    )
}

export default Cert;