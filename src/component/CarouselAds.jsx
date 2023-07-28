import React from 'react'

export default function CarouselAds() {
  return (
    <div id="carouselExampleRide" className="carousel slide rounded" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
            <img src="https://images.macrumors.com/t/dQZq21dmJHx3YkK_MZNHsVFt7Zo=/1920x/article-new/2023/01/iPhone-15-General-Mock-Feature.jpg" className="d-block w-100 rounded" alt="..." style={{ height: '398px' }} />
              </div>
    <div className="carousel-item">
            <img src="https://i0.wp.com/www.seethebest.in/wp-content/uploads/2021/08/BOAT_ROCKERZ_seethebest.in_-1.jpg?fit=970%2C600&ssl=1" className="d-block w-100 rounded" alt="..." style={{ height: '398px' }} />
              </div>
    <div className="carousel-item">
            <img src="https://m.media-amazon.com/images/S/abs-image-upload-na/c/AmazonStores/A21TJRUUN4KGV/41b1378c1f7f549c8c332c79337ad4b6.w3301.h1800.jpg" className="d-block w-100 rounded" alt="..." style={{ height: '398px' }} />
              </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
  )
}
