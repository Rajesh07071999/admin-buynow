import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">404</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>
                <h6>the page you are looking for not avaible!</h6>
              </div>
              <Link className='btn btn-custom mt-2' to={''} >Go To Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFound