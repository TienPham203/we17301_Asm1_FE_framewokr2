import { instance } from "../axios/config"

export const fetchProduct = () => async (dispatch: any) => {
    dispatch({ type: 'product/fetching' })

    try {
        const { data } = await instance.get('/products')
        console.log('data', data);

        await dispatch({ type: 'product/fetchingSuccess', payload: data })


    } catch (error: any) {
        dispatch({ type: 'product/fetchingError', payload: error.message })
    } finally {
        dispatch({ type: 'product/fetchingFinally' })
    }
}