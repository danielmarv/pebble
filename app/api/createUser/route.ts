
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/utils/database';
import { User } from '@/models';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    
    const { name, email, image } = req.body;

    try {
        await connectToDB();
        const user = await User.create({ name, email, image });
        res.status(201).json(user);
    } catch (err: unknown) {
        res.status(500).json({ statusCode: 500, message: (err as Error).message });
    }
}