import ProductCard from './ProductCard'

export default function BuyProductCard({ allitems, addWishList }) {
    return (
        <>
            {
                allitems.map((items, index) => {
                    return (
                        <ProductCard items={items} key={index} addWishList={addWishList}  ChangeQuantity={true} />
                    )
                })
            }
        </>
    )
}