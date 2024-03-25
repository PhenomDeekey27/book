


const Header = () => {
  return (
    <div>
    <nav className="navbar navbar-expand-lg  navbar-expand-md navbar-expand-sm p-4" style={{backgroundColor:"yellow"}}>
            <div className="container-fluid d-flex justify-between">
                <a className="navbar-brand" href="#">Phenom</a>
                <>
               
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse flex-grow-0" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active fw-bolder" aria-current="page" href="#" style={{color:"#080F75"}}>Home</a>
                            </li>
                            
                           
                        </ul>
                   
                    </div>
            </>

            </div>
    </nav>
    </div>
  )
}

export default Header