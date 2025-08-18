import { NextResponse } from 'next/server'
 
export function middleware(request) {
    const url = request.nextUrl;

  
    
    if(url.pathname.startsWith("/dashboard")){
             const token = request.cookies.get("token")
            
             if(!token){
                return NextResponse.redirect(new URL('/login',request.url))
             }
    }
    if(url.pathname.endsWith("/booking")){
      const token = request.cookies.get("token")
      if(!token){
         return NextResponse.redirect(new URL('/login',request.url))
      }
    }

 
}
 

export const config = {

}