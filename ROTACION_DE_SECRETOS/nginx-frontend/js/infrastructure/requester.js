export async function performHTTPRequest(path = "/api", options = {}) {
  try {
    const res = await fetch(path, options);

    if (res.ok) {

      const body = await res.json();

      console.log(
        JSON.stringify(body, null, 2)
      );

    } else {
      const err = `${res.status} ${res.statusText}`;

      console.error(err);
    }
  } catch (err) {
    console.error(`Error en la solicitud HTTP ${options.method} ${path}`);
  }
}
