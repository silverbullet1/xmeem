import { toast } from "react-toastify";

const DEFAULT_URL = "http://localhost:8081/memes";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
  ? process.env.REACT_APP_BACKEND_URL
  : DEFAULT_URL;

const headers = {
  "content-type": "application/json",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PATCH",
};
async function handleErrors(response) {
  const data = await response.json();
  toast.error(response, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  if (response.status === 409) {
    toast.error(`Duplicate entries not allowed!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  if (response.status === 422) {
    toast.error(`Invalid Image URL. Please try again!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else if (!response.ok) {
    throw Error(response.statusText);
  } else {
    toast.success(`Success!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    return data;
  }
}

export async function POST(data) {
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: headers,
    body: data,
  })
    .then(handleErrors)
    .catch((error) => console.log(error));
  return response;
}

export async function GET() {
  const result = await fetch(BACKEND_URL);
  const data = await result.json();
  return data;
}

export async function PATCH(id, body) {
  return await fetch(`${BACKEND_URL}/${id}`, {
    method: "PATCH",
    headers: headers,
    body: body,
  })
    .then(handleErrors)
    .catch((error) => console.log(error));
}
