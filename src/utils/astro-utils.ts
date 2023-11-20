export const jsonResp = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const errResp = (message: string | object, status = 500) => jsonResp({ message }, status);
