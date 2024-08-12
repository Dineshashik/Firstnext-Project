import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname, searchParams } = request.nextUrl;

    const token = searchParams.get("token")?.slice(7);
    if (token) {
        request.cookies.delete("token")
    }
    const tokenFromCookies = request.cookies.get('token');
    const tabInfo = searchParams.get("tab")

    try {
        if (token || tokenFromCookies) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/getUser`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token || tokenFromCookies?.value}`,
                }
            },);

            const { data: user } = await res.json();

            // Set the token cookie
            if (token && user.role && tokenFromCookies?.value !== token) {


                const newUrl = new URL(pathname, request.url);
                newUrl.searchParams.delete("token");
                const response = NextResponse.redirect(newUrl);

                response.cookies.set({
                    name: "token",
                    value: token,
                    path: "/",
                })
                return response;
            }



            // if (!canAccessTab(user.stage, tabInfo)) {
            //     return NextResponse.redirect(new URL(`${user.role.toLowerCase()}/signup?tab=${user.stage}`, request.url));
            // }

            if (user.role) {
                if (!pathname.startsWith("/founder") && user.role === "FOUNDER") {
                    return NextResponse.redirect(new URL("/founder", request.url));
                }
                if (!pathname.startsWith("/investor") && user.role === "INVESTOR") {
                    return NextResponse.redirect(new URL("/investor", request.url));
                }
                if (!pathname.startsWith("/admin") && user.role === "ADMIN") {
                    return NextResponse.redirect(new URL("/admin", request.url));
                }
                if (!pathname.startsWith('/admin') && !pathname.startsWith(`/${user.role.toLowerCase()}/signup`) && user.stage !== "ADMIN") {
                    return NextResponse.redirect(new URL(`${user.role.toLowerCase()}/signup?tab=${user.stage}`, request.url));
                }
                if (!pathname.startsWith('/admin') && !pathname.startsWith(`/${user.role.toLowerCase()}/signup`) && user.stage === "ADMIN" && user.admin_status !== "APPROVED") {
                    return NextResponse.redirect(new URL(`${user.role.toLowerCase()}/signup?tab=${user.stage}`, request.url));
                }
                // if (!pathname.startsWith(`/${user.role.toLowerCase()}`) && user.stage === "ADMIN" && updatedUser.admin_status !== "PENDING" && updatedUser !== "REJECTED") {
                //     return NextResponse.redirect(new URL(`${user.role.toLowerCase()}`, request.url));
                // }
            }

        }
        else {
            return NextResponse.redirect(new URL('/', request.url));
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/founder/:path*", "/admin/:path*", "/investor/:path*"],
};

// function canAccessTab(userStage: any, tab: any): boolean {

//     enum Tab {
//         DETAILS = 0,
//         COMPANY = 1,
//         OTHER = 2,
//         PRICE = 3,
//         ADMIN = 4,
//     }
//     const showTab: Record<string, number> = {
//         DETAILS: Tab.DETAILS,
//         COMPANY: Tab.COMPANY,
//         OTHER: Tab.OTHER,
//         PRICE: Tab.PRICE,
//         ADMIN: Tab.ADMIN,
//     };
//     const userTab = showTab[userStage];
//     const requestedTab = showTab[tab];

//     console.log({ userStage, requestedTab, userTab }, requestedTab <= userTab)

//     return requestedTab <= userTab;
// }
