import ProductCard from './ProductCard'

export default function BuyProductCard({ allitems,RemoveShoppingCart,ChangeQuantity }) {

    return (
        <>
            {
                allitems.map((items, index) => {
                    return (
                        <ProductCard items={items} key={index} RemoveShoppingCart={RemoveShoppingCart} ChangeQuantity = {ChangeQuantity}/>
                    )
                })
            }
        </>
    )
}
