import { z } from 'zod'

export const registerSchema = z.object({
    username: z.string().min(6, { message: "Username must be at least 6 characters" }).max(20, { message: "Username must be at most 20 characters" }),
    email: z.string().email(),
    dob: z.date(),
    timeZone: z.string(),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(100, { message: "Password must be at most 100 characters" }),
    confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }).max(100, { message: "Password must be at most 100 characters" }),
    weeklyHoursPlayed: z.number().gt(0).lte(168),
    yearsPlayed: z.string().max(255),
    preferredGames: z.string(),
    skillLevel: z.string(),
})