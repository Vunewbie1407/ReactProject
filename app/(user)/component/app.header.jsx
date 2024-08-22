"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../redux/slices/userSlice';
import { useRouter } from 'next/navigation';

export default function AppHeader() {
  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userFullName, setUserFullName] = useState('');
  
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();
  const totalItem = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('http://localhost:4000/cate', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (res.ok) {
          setCategories(data);
        } else {
          console.error('Failed to fetch categories:', data.error);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }

      const tokenCookie = document.cookie.split(';').find(c => c.trim().startsWith('token='));
      if (tokenCookie) {
        const token = tokenCookie.split('=')[1];
        setIsLoggedIn(true);
      }
    }

    fetchCategories();
  }, []);

  // Xử lý đăng xuất
  const handleLogout = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'; // Xóa token từ cookie
    setIsLoggedIn(false);
    // setUserFullName('');
    dispatch(logout());
    router.push('/')
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <Link href={'/'} className="navbar-brand text-white">
            Adodos
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href={'/allProduct'} className="nav-link text-white">
                  Sản phẩm
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-white"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Danh mục sản phẩm
                </a>
                <ul className="dropdown-menu">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link href={`/productByCategory/${category.id}`} className="dropdown-item">
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>

            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href={'/page_cart'} className="nav-link text-white">
                  Giỏ hàng
                  <div className="badge text-bg-light ms-1">{totalItem}</div>
                </Link>
              </li>
              <li className="nav-item dropdown">
                <>
                  <a
                    className="nav-link dropdown-toggle text-white"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {isLoggedIn ? `Xin chào` : 'Tài khoản'}
                  </a>
                  <ul className="dropdown-menu end-0 left-auto">
                    {isLoggedIn ? (
                      <>
                        <li>
                          <Link href={'/infomation'} className="dropdown-item">
                            Thông tin cá nhân
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href={'/myOrders'}>
                            Lịch sử mua hàng
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" href={'/changepassword'}>
                            Đổi mật khẩu
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a className="dropdown-item" href="#" onClick={handleLogout}>
                            Đăng xuất
                          </a>
                        </li>
                      </>
                    ) : (
                      <li>
                        <Link href={'/login'} className="dropdown-item">
                          Đăng nhập
                        </Link>
                      </li>
                    )}
                  </ul>
                </>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <style jsx>{`
        ul.left-auto {
          left: auto;
        }
      `}</style>
    </>
  );
}
