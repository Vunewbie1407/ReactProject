import { NextResponse } from 'next/server';

export async function middleware(request) {
  const token = request.cookies.get('token');
//   console.log(111);
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  const res = await fetch('http://localhost:4000/users/checktoken', {
    headers: {
      Authorization: `Bearer ${token.value}`,
    },
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const data = await res.json();
//   console.log(data)
  const role = data.role;
  const url = request.nextUrl.clone();
//   console.log(role)
  if(url.pathname.startsWith("/admin")){
    if(role!==1){
        return NextResponse.redirect(new URL('/', request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/infomation', '/admin'],
};
