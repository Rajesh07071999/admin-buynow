import { Link } from "react-router-dom"

const Heading = (props) => {
    return (
        <>
            {/* <!-- start page title --> */}
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
                                {
                                    props.subtitle && <li className="breadcrumb-item"><Link to={props.sublink}>{props.subtitle}</Link></li>
                                }

                                <li className="breadcrumb-item active">{props.title}</li>
                            </ol>
                        </div>
                        <h4 className="page-title">{props.title} {props.name}</h4>
                    </div>
                </div>
            </div>
            {/* <!-- end page title -->  */}

        </>
    )
}

export default Heading