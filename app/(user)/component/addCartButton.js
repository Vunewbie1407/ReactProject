import { useDispatch } from "react-redux";
// import { addToCart } from "../../redux/slices/cartSlice";
import { addToCart } from "../../../redux/slices/cartSlice";
export default function AddCartButton(props) {
    const dispatch = useDispatch();
    const {product,quantity,size, className} = props;
    return (
        <>
            <button style={{ width: '100%' }} className={`btn btn-primary w-100 ${className}`}
            onClick={() => dispatch(addToCart({ product, quantity, size }))}>
                {props.children}
            </button>
        </>
    )
}