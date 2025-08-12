function EditName({ editNickname, setNickname }) {


    return(
        <div className="article" style={{margin: '45px 0 0 0'}}>
            <input className="input-box" type='text' placeholder="말즈 이용자" value={editNickname} onChange={e => setNickname(e.target.value)}/>
        </div>

    )
}

export default EditName;