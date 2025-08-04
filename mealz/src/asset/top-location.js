import { ReactComponent as AlertIcon } from './icon/icon-alert.svg';

function TOP() {
    return(
        <div class="top">
            <h1>서울시 종로구</h1>
            <div class="group-align-left hug">
                <AlertIcon className="icon-large" />
                <input type="checkbox" class="toggle-input" id="toggle-usertype"/>
                <label class="toggle" for="toggle-usertype"/>
            </div>

        </div>
    )
}

export default TOP;