
import Hero from '../component/Hero'
import OffersOfDay from '../component/OffersOfDay'
import CategoryProduct from '../component/CategoryProduct'
import NewProducts from '../component/NewProducts';
import { useEffect, useState } from 'react';
export default function Home({product}) {
  const [Category, setCategory] = useState(2)
  useEffect(() => {
    setCategory(Category)
  }, [Category])
  
  return (
    <div className='container-fluid bg-light'>
      <Hero setCategory={setCategory}/>
      <CategoryProduct  url="https://bootstrap-ecommerce-web.netlify.app/images/banners/tech.jpg" title="Products According to your Selected Category" id={Category} />
      <OffersOfDay product={product}/>
      <CategoryProduct  url="https://bootstrap-ecommerce-web.netlify.app/images/banners/tech.jpg" title="Consumer electronics and gadgets" id={1} />
      <CategoryProduct  url="https://bootstrap-ecommerce-web.netlify.app/images/banners/interior.jpg" title="Home and outdoor items"  id={3} />
      <NewProducts product={product.reverse()} title={"New Product's"} countOfProduct = {20}/>
    </div>
  )
}