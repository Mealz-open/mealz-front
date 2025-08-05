import { ReactComponent as AlertIcon } from './icon/icon-alert.svg';

function TOPTitle({title}) {
    return(
        <div class="top">
                <AlertIcon className="icon-large" />
            <h1>{title}</h1>
                <AlertIcon className="icon-large" />
        </div>
    )
}

export default TOPTitle;