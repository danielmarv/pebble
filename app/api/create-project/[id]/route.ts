// In api/project.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDB } from '@/utils/database';
import { Project } from '@/models';
import { ProjectForm } from "@/common.types";
import { uploadImage } from '@/lib/actions';

interface ProjectRequestBody {
  form: ProjectForm;
  projectId: string;
  token: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      return getProject(body, res);

    case 'PUT':
      return updateProject(body, res);

    case 'DELETE':
      return deleteProject(body, res);

    default:
      return res.status(405).end(); // Method Not Allowed
  }
}

async function getProject({ projectId }: ProjectRequestBody, res: NextApiResponse) {
  try {
    await connectToDB();

    // Make the API call to get the project
    const result = await Project.findById(projectId);

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


async function updateProject({ form, projectId }: ProjectRequestBody, res: NextApiResponse) {
  try {
    // Check if the image is a base64 data URL
    const isBase64DataURL = function(value: string) {
        const base64Regex = /^data:image\/[a-z]+;base64,/;
        return base64Regex.test(value);
    };

    let updatedForm = { ...form };

    // If a new image is being uploaded, update the image URL
    const isUploadingNewImage = isBase64DataURL(form.image);

    if (isUploadingNewImage) {
      const imageUrl = await uploadImage(form.image);

      if (imageUrl.url) {
        updatedForm = { ...updatedForm, image: imageUrl.url };
      }
    }
    const project = await Project.findById(projectId);

    if (!project) {
        return res.status(404).json({ error: 'Project not found' });
    }

    // Update the project
    project.set(updatedForm);

    const updatedProject = await project.save();



    return res.status(200).json(updatedProject);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteProject({ projectId, token }: ProjectRequestBody, res: NextApiResponse) {
  try {
    await connectToDB();

    const result = await Project.findByIdAndDelete(projectId);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
