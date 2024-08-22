import Link from "next/link";

export default function Blog(){
    return(
        <>
        <h1>Bài viết mới</h1>
        <ul>
            <li>
                <Link href="/blog/1">Bai 1</Link>
            </li>
            <li>
                <Link href="/blog/2">Bai 2</Link>
            </li>
            <li>
                <Link href="/blog/3">Bai 3</Link>
            </li>
            <li>
                <Link href="/blog/4">Bai 4</Link>
            </li>
            <li>
                <Link href="/blog/5">Bai 5</Link>
            </li>
        </ul>
        </>

    );
}