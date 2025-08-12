function EditMembertype({ editMembertype, setMembertype }) {
    return (
      <div className="article" style={{ margin: '45px 0 0 0', display: 'flex', gap: '10px' }}>
        <button
          type="button"
          className={`btn-fill btn-line ${editMembertype === "DONATOR" ? "active" : ""}`}
          onClick={() => setMembertype("DONATOR")}
        >
          기부자
        </button>
  
        <button
          type="button"
          className={`btn-fill btn-line ${editMembertype === "BENEFICIARY" ? "active" : ""}`}
          onClick={() => setMembertype("BENEFICIARY")}
        >
          수혜자
        </button>
      </div>
    );
  }
  export default EditMembertype;