'use client'
import { useEffect, useState } from "react";
import ProductCardSlide from "./component/ProductCardSlide";
import Alert from "./component/alert";
import Counter from "./component/counter"
import Like from "./component/like"
import Timer from "./component/timer";
import styles from "./page.module.css"
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import FormExample from "./component/formExample";
import FormPost from "./component/formPost"
export default function Home() {
  interface AppState {
    user: {
      address:String,
      phone:String,
      email:String,
      name:String,
      fullname:String,
      password:String,
      role:Number,
    };

  }
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  // const router = useRouter();
  // const dispatch = useDispatch();
  const loggedInUser = useSelector((state:AppState) => state.user);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/product");
        const data = await res.json();
        setProducts(data);
        // console.log("check data product: ",data);
        
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:4000/cate");
        const data = await res.json();
        setCategories(data);
        // console.log("check data category: ",data);
        
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    }
  }, [loggedInUser]);

  return (
    <>
    {/* <FormPost></FormPost> */}
    {/* <FormExample></FormExample> */}
      <div id="carouselExample" className="carousel slide mt-3">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="./image/slide4.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="./image/slide5.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="./image/slide6.jpg" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <form className="d-flex ms-4 mt-3" action="/timkiem">
        <input className="form-control me-2" name="keyword" placeholder="Nhập tên sản phẩm" />
        <button className="btn btn-outline-success" type="submit">
          Tìm
        </button>
      </form>

      {/* <h3 className={styles.red}>red</h3> */}

      {categories.map((category: { id: string; name: string }) => (
        <div key={category.id}>
          <h3 className="mt-3 text-decoration-underline">{category.name}</h3>
          <ProductCardSlide products={products.filter((product: { cate_id: string }) => product.cate_id === category.id)} />
        </div>
      ))}
      {/* <FormExample></FormExample> */}
      <FormPost></FormPost>
    </>
  );
}
