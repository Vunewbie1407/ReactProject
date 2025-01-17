// import "../public/bootstrap/css/bootstrap.min.css"
import "../../public/bootstrap/css/bootstrap.min.css"
import { Inter } from "next/font/google";
import AppHeader from "./component/app.header.jsx";
import AppFooter from "./component/app.footer";
import Container from 'react-bootstrap/Container';
import Providers from "@/redux/provider"
// import store from "../redux/store"
import store from "../../redux/store.js"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "React Web App",
    description: "Generated by create next app",
};

export default function Layout({ children }) {
    return (
        <>
            <html lang="en">
                <body className={inter.className}>
                    <Providers>
                        <AppHeader />
                        <Container>
                            {children}
                        </Container>
                        <AppFooter />
                    </Providers>
                    {/* <script src="./bootstrap/js/bootstrap.bundle.js"></script> */}
                    <script src="./bootstrap/js/bootstrap.bundle.js"></script>
                    {/* <script src=""></script> */}
                </body>
            </html>

        </>
    )
}