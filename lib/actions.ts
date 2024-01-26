
import { ProjectForm } from "@/common.types";
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (err) {
    throw err;
  }
};

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({
        path: imagePath,
      }),
    });
    return response.json();
  } catch (err) {
    throw err;
  }
};

export const createNewProject = async (form:ProjectForm, creatorId:string,) => {
  try {
    const token = await fetchToken();
    const response = await fetch(`${serverUrl}/api/createProject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    throw err;
  }
}

export const updateProject = async (form: ProjectForm, projectId: string) => {
  try {
    const token = await fetchToken();
    const response = await fetch(`${serverUrl}/api/updateProject/${projectId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    return response.json();
  } catch (err) {
    throw err;
  }
}

export const deleteProject = async (projectId: string) => {
  try {
    // const token = await fetchToken();
    const response = await fetch(`${serverUrl}/api/deleteProject/${projectId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  } catch (err) {
    throw err;
  }
}

export const getProject = async (projectId: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/getProject/${projectId}`);
    return response.json();
  } catch (err) {
    throw err;
  }
}

