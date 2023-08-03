
import Hero from '../component/Hero'
import OffersOfDay from '../component/OffersOfDay'
import CategoryProduct from '../component/CategoryProduct'
import NewProducts from '../component/NewProducts';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
export default function Home({ product }) {
  if(sessionStorage.getItem('login')){
    Swal.fire({
      title: 'Login',
      type: 'success',
      icon: 'success',  
      text: sessionStorage.getItem('login'),
  });
  sessionStorage.removeItem('login')
  }
  const [Category, setCategory] = useState(1)
  useEffect(() => {
    setCategory(Category)
  }, [Category])
  return (
    <div className='container-fluid bg-light'>
      <Hero setCategory={setCategory}/>
      <CategoryProduct url="https://bootstrap-ecommerce-web.netlify.app/images/banners/interior.jpg" title="Products According to your Selected Category" Sub_Category={Category} />
      <OffersOfDay product={product} />
      <CategoryProduct url="https://bootstrap-ecommerce-web.netlify.app/images/banners/tech.jpg" title="Consumer electronics and gadgets" Category={1} />
      <CategoryProduct url="https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2022-06/modern-living-room-interior-with-sofa-green-plants-lamp-table-dark-wall-background_0.jpg" title="Home and outdoor items" Category={3} />
      <NewProducts product={product.reverse()} title={"New Product's"} countOfProduct={20} />
    </div>
  )
}