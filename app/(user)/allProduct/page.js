"use client"
import { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import ReactPaginate from 'react-paginate';
import AllProductCard from "../component/AllProductCard";
export default function AllProduct() {
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [sortOption, setSortOption] = useState('asc');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [pageNumber, setPageNumber] = useState(0)
    const productsPerpage = 12;

    async function fetchAllProducts() {
        try {
            const res = await fetch("http://localhost:4000/product");
            const newProducts = await res.json();
            setProducts(newProducts);
            setOriginalProducts(newProducts);
            setFilteredProducts(newProducts);
            console.log("Dữ liệu tất cả sản phẩm:", newProducts);
        } catch (error) {
            console.error('Lỗi khi lấy tất cả sản phẩm:', error);
        }
    }

    useEffect(() => {
        fetchAllProducts();
    }, []);
    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await fetch("http://localhost:4000/cate");
                const data = await res.json();
                setCategories(data);
                console.log("Dữ liệu danh mục:", data);
            } catch (error) {
                console.error('Lỗi khi lấy danh mục:', error);
            }
        }
        fetchCategories();
    }, []);

    const handleSort = (productsToSort) => {
        return [...productsToSort].sort((a, b) => {
            if (sortOption === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
    }


    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setFilteredProducts(handleSort(filteredProducts));
    }


    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        if (e.target.value === '') {
            setFilteredProducts(originalProducts);
        } else {
            const filteredProductsByCategory = originalProducts.filter(product => product.cate_id === e.target.value);
            setFilteredProducts(handleSort(filteredProductsByCategory));
        }
    }
    const pageCount = Math.ceil(filteredProducts.length / productsPerpage);
    const handlePageClick = (seclectedPage) => {
        setPageNumber(seclectedPage.selected);
    }
    const offset = pageNumber * productsPerpage;
    const currentPageProducts = filteredProducts.slice(offset, offset + productsPerpage);
    return (
        <div className="container my-3">
            <div>
            <div className="p-1 w-auto">
                        <h5 className="text-success">DANH SÁCH SẢN PHẨM</h5>
                    </div>
                    <div className="row">
                        <div className="col-sm-3">
                        <div>
                        <select className="form-select w-auto" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="">Tất cả danh mục</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <select className="form-select w-auto" onChange={handleSortChange}>
                        <option value="asc">Giá tăng dần</option>
                        <option value="desc">Giá giảm dần</option>
                    </select>
                        </div>
                        <div className="col-sm-8">
                        <AllProductCard products={currentPageProducts} />
                        <div className="pagination-container">
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            breakClassName={'page-item'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            previousClassName={'page-item'}
                            nextClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextLinkClassName={'page-link'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                        />
                    </div>
                        </div>
                    </div>
                {/* <div className="d-flex justify-content-between mx-1">
                    <div>
                        <select className="form-select w-auto" value={selectedCategory} onChange={handleCategoryChange}>
                            <option value="">Tất cả danh mục</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <select className="form-select w-auto" onChange={handleSortChange}>
                        <option value="asc">Giá tăng dần</option>
                        <option value="desc">Giá giảm dần</option>
                    </select>
                </div> */}
                {/* <div className="row">

                        <AllProductCard products={currentPageProducts} />

                    
                </div> */}
                {/* <div className="row">
                <div className="pagination-container">
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            breakClassName={'page-item'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            previousClassName={'page-item'}
                            nextClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextLinkClassName={'page-link'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                        />
                    </div>
                </div> */}
            </div>
        </div>
    );
}
