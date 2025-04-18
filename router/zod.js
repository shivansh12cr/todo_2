const { z } = require("zod");

const userSchema = z.object({
    email: z.string().email(),
    username: z.string().optional(),
    password: z.string().min(6), // enforce minimum length
    list: z.array(z.string().optional()).optional()
});

module.exports = userSchema;