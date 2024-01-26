// pages/api/createProject.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/utils/database';
import { Project } from '@/models';
import { ProjectForm } from "@/common.types";
import { uploadImage } from '@/lib/actions';

interface CreateProjectRequestBody {
  form: ProjectForm;
  creatorId: string;
  token: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    await connectToDB();
    const { form, creatorId, token }: CreateProjectRequestBody = req.body;
    const imageUrl = await uploadImage(form.image);

    if (imageUrl.url) {
      const project = await Project.create({
        ...form,
        image: imageUrl.url,
        createdBy: creatorId,
      });

      return res.status(200).json({ project });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

