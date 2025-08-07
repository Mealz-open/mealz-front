import { ReactComponent as AlertIcon } from './icon/icon-alert.svg';

function TOPLocation() {
    return(
        <div className="top">
            <h1>서울시 종로구</h1>
            <div className="group-align-left hug">
                <AlertIcon className="icon-large" />
                <input type="checkbox" className="toggle-input" id="toggle-usertype"/>
                <label className="toggle" htmlFor="toggle-usertype"/>
            </div>

        </div>
    )
}

export default TOPLocation;