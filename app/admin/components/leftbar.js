"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LeftBar() {
    const pathname = usePathname();
    return (
        <>
            <ul className="nav nav-pills flex-column mb-auto" data-bs-themes>
                <li className="nav-item">
                    <Link href="/admin" className={`nav-link rounded-0 ${pathname=="/admin"?"active":"text-white"}`} aria-current="page">
                        <i className="far fa-tachometer-alt-fastest fa-fw"></i>
                        <span className="d-none d-sm-inline-block">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/orders" className="nav-link rounded-0 text-white">
                        <i className="far fa-shopping-cart fa-fw"></i>
                        <span className="d-none d-sm-inline-block">Orders</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/product" className={`nav-link rounded-0 ${pathname=="/admin/product"?"active":"text-white"}`}>
                        <i className="far fa-boxes fa-fw"></i>
                        <span className="d-none d-sm-inline-block">Products</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/category" className={`nav-link rounded-0 ${pathname=="/admin/category"?"active":"text-white"}`}>
                        <i className="far fa-boxes fa-fw"></i>
                        <span className="d-none d-sm-inline-block">Categories</span>
                    </Link>
                </li>
                <li>
                    <Link href="/admin/user" className={`nav-link rounded-0 ${pathname=="/admin/user"?"active":"text-white"}`}>
                        <i className="far fa-users fa-fw"></i>
                        <span className="d-none d-sm-inline-block">Customers</span>
                    </Link>
                </li>
                <li>
                    <Link href="admin/ratings" className="nav-link rounded-0 text-white">
                        <i className="far fa-star-half-alt"></i>
                        <span className="d-none d-sm-inline-block">Ratings</span>
                    </Link>
                </li>
            </ul>
        </>
    );
}