import {NextResponse} from "next/server"
import {userService} from "@/lib/services/user.service"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const {email, name, password, phone, username} = body

        if (!email || !name || !password || !username) {
            return NextResponse.json(
                {error: "Missing required fields"},
                {status: 400}
            )
        }

        // Check if user exists
        const existingUser = await userService.getUserByEmail(email) || await userService.getUserByUsername(username)

        if (existingUser) {
            return NextResponse.json(
                {error: "User already exists"},
                {status: 400}
            )
        }

        const user = await userService.createUser({
            email,
            name,
            password,
            phone,
            username
        })

        return NextResponse.json({user})
    } catch (error) {
        console.error('Registration error:', error)
        return NextResponse.json(
            {error: "Something went wrong"},
            {status: 500}
        )
    }
}
