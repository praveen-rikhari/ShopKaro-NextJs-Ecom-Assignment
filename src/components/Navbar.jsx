"use client";
import Link from "next/link";
import { FaCartPlus } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
    return (
        <header>
            <nav className="nav">
                <Link href="/">
                    <h1 className="logo">
                        Shop <span>Karo</span>
                    </h1>
                </Link>
                <div className="nav_list">
                    <Link href="/" className="nav_link">
                        Home
                    </Link>

                    <Link href="/cart" className="nav_link">
                        <FaCartPlus size={30} />
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
