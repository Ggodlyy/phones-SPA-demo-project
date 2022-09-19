const request = async (method, url, data) => {
  try {
    const user = localStorage.getItem("auth");
    const auth = JSON.parse(user || "{}");

    let headers = {};

    if (auth.accessToken) {
      headers["X-Authorization"] = auth.accessToken;
    }

    let buildRequest;
    // console.log(`method: ${method}, url: ${url}, data ${data}`);

    if (method === "GET") {
      buildRequest = fetch(url, { headers });
    } else {
      buildRequest = fetch(url, {
        method,
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }
    const response = await buildRequest;

    // console.log(response);

    const result = await response.json();

    // console.log(`this is the result ${result}`);

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const get = request.bind({}, "GET");
export const post = request.bind({}, "POST");
export const patch = request.bind({}, "PATCH");
export const put = request.bind({}, "PUT");
export const del = request.bind({}, "DELETE");
