import { useNavigate } from 'react-router-dom';
import { ReactComponent as Chevron } from './icon/icon-chevron.svg';

function TOPTitle({title}) {
    const navigate = useNavigate();

    return(
        <div class="top">
            <button onClick={()=>navigate(-1)}>
                <Chevron className="icon-large" />
            </button>
            <h1 style={{overflow: "hidden", textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 250}}>{title}</h1>
                <Chevron className="icon-large" style={{ visibility:'hidden' }}/>
        </div>
    )
}

export default TOPTitle;