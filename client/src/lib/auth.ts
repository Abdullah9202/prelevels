import { cookies } from "next/headers";



const AUTH_TOKEN_LIFE = 3600
const REFRESH_TOKEN_NAME = 'auth-refresh-token'
const TOKEN_NAME = 'auth-token'

export async function getToken() {
    const cookieStore = await cookies();
    const authToken = cookieStore.get(TOKEN_NAME);
    return authToken?.value;
}

export async function getRefreshToken() {
    const cookieStore = await cookies();
    const authToken = cookieStore.get(REFRESH_TOKEN_NAME);
    return authToken?.value;
}



export async function setToken(authToken:string){
    // login
    ;(await cookies()).set({
        name : TOKEN_NAME,
        value :  authToken,
        httpOnly: true,
        sameSite: 'strict',
        maxAge : AUTH_TOKEN_LIFE,
        secure : process.env.NODE_ENV !== 'development'
    })

}

export async function setReFreshToken(authrefreshToken:string){
    // login
    ;(await cookies()).set({
        name : REFRESH_TOKEN_NAME,
        value :  authrefreshToken,
        httpOnly: true,
        sameSite: 'strict',
        maxAge : AUTH_TOKEN_LIFE,
        secure : process.env.NODE_ENV !== 'development'
    })

}


export async function deleteTokens(){
    // logout
    const cookieStore = await cookies()
    cookieStore.set({
        name: TOKEN_NAME,
        value: '',
        maxAge: -1,
    })

    cookieStore.set({
        name: REFRESH_TOKEN_NAME,
        value: '',
        maxAge: -1
    })
}


