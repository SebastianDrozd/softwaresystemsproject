import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const url = request.nextUrl;

   
    
    if(url.pathname.startsWith("/dashboard")){
             const token = request.cookies.get("token")
             if(!token){
                return NextResponse.redirect(new URL('/login',request.url))
             }
    }

 // return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
//  matcher: '/about/:path*',
}