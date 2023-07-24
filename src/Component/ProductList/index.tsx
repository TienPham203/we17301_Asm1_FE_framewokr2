import { Dispatch, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { instance } from "../../axios/config"
import { fetchProduct } from "../../action/product";

const ProductList = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const { products, isLoading, error } = useSelector((state: any) => state.products)


    useEffect(() => {
        dispatch(fetchProduct())
    }, [])
    console.log('product', products);




    return (
        <div>
            <table className="border">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((item: any, index: any) => {
                        console.log(item.name);

                        return <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>
                                <button onClick={() => dispatch({ type: 'product/delete', payload: item.id })}>Xóa</button>
                            </td>
                        </tr>
                    })}



                </tbody>
            </table>

            <button onClick={() => dispatch({ type: 'product/add', payload: { id: 3, name: "Product C" } })}>Add</button>
            <button onClick={() => dispatch({ type: 'product/update', payload: { id: 3, name: "Product C update" } })}>Update</button>
        </div >
    )
}

export default ProductList