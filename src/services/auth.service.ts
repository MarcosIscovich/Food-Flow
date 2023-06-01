import { configuration } from "~/config/env.config";

export const login = async (email: string, password: string) => {
    return await fetch(configuration.api + 'login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
        .then(async (data) => {
            const response = await data.json()
            console.log("RESPONSE", response)
            if (response.access_token) {
                //  localStorage.setItem('user', JSON.stringify(data));
            }

            console.log("LOGIN", response.access_token);
            return response;
        }
        )
    /* .then(data => {

        if (data.access_token) {
            //  localStorage.setItem('user', JSON.stringify(data));
        }

        console.log("LOGIN", data.access_token);
        return data;
    }
    ); */
}

export const verifyToken = async (token: string) => {
    return await fetch(configuration.api + "verifytoken", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }).then(async (data) => {
      const response = await data.json();
      console.log("REfreshToken", response);
      if (response.access_token) {
        //  localStorage.setItem('user', JSON.stringify(data));
      }

      console.log("Token", response.access_token);
      return response;
    }).catch((error) => {
        console.log("Error", error)
        return null
    });
    /* .then(data => {

        if (data.access_token) {
            //  localStorage.setItem('user', JSON.stringify(data));
        }

        console.log("LOGIN", data.access_token);
        return data;
    }
    ); */
}