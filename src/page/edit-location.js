function EditLocation({ editLocation, setLocation }){
    
    return(
        <div className="article" style={{margin: '45px 0 0 0'}}>
            <input className="input-box" type='text' placeholder="위치" value={editLocation} onChange={e => setLocation(e.target.value)}/>
        </div>
    )
}

export default EditLocation;