
import Hero from '../component/Hero'
import OffersOfDay from '../component/OffersOfDay'
import CategoryProduct from '../component/CategoryProduct'
import NewProducts from '../component/NewProducts';
export default function Home({product}) {

  return (
    <div className='container-fluid bg-light'>
      <Hero/>
      <OffersOfDay product={product}/>
      <CategoryProduct  url="https://bootstrap-ecommerce-web.netlify.app/images/banners/tech.jpg" title="Consumer electronics and gadgets" id={1} />
      <CategoryProduct  url="https://bootstrap-ecommerce-web.netlify.app/images/banners/interior.jpg" title="Home and outdoor items"  id={3} />
      <NewProducts product={product.reverse()} title={"New Product's"} countOfProduct = {20}/>
    </div>
  )
}