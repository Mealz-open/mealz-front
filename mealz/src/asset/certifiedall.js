import { ReactComponent as Gold } from './icon/icon-gold.svg';
import { ReactComponent as Silver } from './icon/icon-silver.svg';
import { ReactComponent as Bronze } from './icon/icon-bronze.svg';

function CertAll() {
    return(
        <div class="article">
          <div class="box-col gap10">
            <div class="card-row">
                <div class="cert-badge">
                    <Gold />
                </div>
                <div class="box-col gap5">
                    <h4>동네 떡볶이</h4>
                    <div class="box-row gap5"><h5>누적 나눔 횟수</h5><h5 class="var-primary">87</h5></div>
                </div>
            </div>
            <div class="card-row">
                <div class="cert-badge">
                    <Silver />
                </div>
                <div class="box-col gap5">
                    <h4>동네 떡볶이</h4>
                    <div class="box-row gap5"><h5>누적 나눔 횟수</h5><h5 class="var-primary">80</h5></div>
                </div>
            </div>
            <div class="card-row">
                <div class="cert-badge">
                    <Bronze />
                </div>
                <div class="box-col gap5">
                    <h4>동네 떡볶이</h4>
                    <div class="box-row gap5"><h5>누적 나눔 횟수</h5><h5 class="var-primary">60</h5></div>
                </div>
            </div>
            <div class="card-row">
                <div class="cert-badge">
                    <Bronze />
                </div>
                <div class="box-col gap5">
                    <h4>동네 떡볶이</h4>
                    <div class="box-row gap5"><h5>누적 나눔 횟수</h5><h5 class="var-primary">60</h5></div>
                </div>
            </div>
            <div class="card-row">
                <div class="cert-badge">
                    <Bronze />
                </div>
                <div class="box-col gap5">
                    <h4>동네 떡볶이</h4>
                    <div class="box-row gap5"><h5>누적 나눔 횟수</h5><h5 class="var-primary">60</h5></div>
                </div>
            </div>
            <div class="card-row">
                <div class="cert-badge">
                    <Bronze />
                </div>
                <div class="box-col gap5">
                    <h4>동네 떡볶이</h4>
                    <div class="box-row gap5"><h5>누적 나눔 횟수</h5><h5 class="var-primary">60</h5></div>
                </div>
            </div>
          </div>
        </div>
    )
}

export default CertAll;