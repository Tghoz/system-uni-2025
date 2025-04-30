const url = "https://pydolarve.org/api/v2/dollar?page=criptodolar";

export const data = async () => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error en la petición");

  return res.json();


};
