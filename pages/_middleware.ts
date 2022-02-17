import {NextFetchEvent, NextRequest, NextResponse} from "next/server"

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const {pathname} = req.nextUrl
  if (pathname == "/") {
    return NextResponse.redirect("/tests/food")
  }
  else if (pathname == "/tests") {
    return NextResponse.redirect("/tests/food")
  }
  return NextResponse.next()
}