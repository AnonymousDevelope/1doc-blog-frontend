"use server"
import { cookies } from "next/headers"

export async function getCookie(token:string){
    const cookieStore = await cookies()
    return cookieStore.get(token)?.value
}