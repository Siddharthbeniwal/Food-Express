import React from 'react'

const Carousel = () => {
    return (
        <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">

            <div className="carousel-inner">
                <div className="carousel-caption" style={{ zIndex: 1 }}>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-success" type="submit">Search</button>
                    </form>
                </div>

                <div className="carousel-item active">
                    <img src="/images/slide1.jpg" className="d-block w-100" alt="img" style={{ height: '600px' }} />
                </div>

                <div className="carousel-item">
                    <img src="/images/slide2.jpg" className="d-block w-100" alt="img" style={{ height: '600px' }} />
                </div>

                <div className="carousel-item">
                    <img src="/images/slide3.jpg" className="d-block w-100" alt="img" style={{ height: '600px' }} />
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>

        </div>
    )
}

export default Carousel
