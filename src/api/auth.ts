export const urlBase = "http://localhost:4000/api/v1/user";


export const postData = async ( data: object, url:string) => {
  const res = await fetch(`${urlBase}/${url}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error en la petición");
  return res.json();
};
