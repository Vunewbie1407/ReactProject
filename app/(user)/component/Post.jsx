export default function Post(props){
    return(
        <>
            <div className="card mt-3">
                <div className="card-body d-flex">
                    <img src={`/img/${props.image}`} />
                    <div>
                        <div>
                            <strong>{props.name}</strong>
                            <span className="text-muted">{props.time}</span>
                        </div>
                        {props.children}
                    </div>
                </div>
                <div className="card-footer">
                    <button className="btn btn-outline-success">Approve</button>
                    <button className="btn btn-outline-danger">Reject</button>
                </div>
            </div>
        </>
    )
}