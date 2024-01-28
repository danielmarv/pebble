import { Project } from '@/models'; // Assuming you have a Project model
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/utils/database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { category, endCursor } = req.query;

    if (req.method === 'GET') {
        try {
            await connectToDB();
            const projects = await Project.find({ category, endCursor });

            return res.status(200).json(projects);
        } catch (error) {
            // Handle error
            console.error('Error fetching projects:', error);
            throw error;
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
