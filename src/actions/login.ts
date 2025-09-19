'use server'
import { API_URL } from "@/env";

type login =  {
    email: string
    senha: string
}

const Login = async (payload: login) => {
     try {
      const response = await fetch(API_URL + "/api/login/run", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: "carlossilva@gmail.com", senha: "123123"}),
      });

      console.log(JSON.stringify (await response.json()))

      if (response) {
        const data = await response.json();
        return data
      }
    } catch (err) {
      console.error('Ocorreu um erro:', err);
     throw err
    } 
  };

  export {Login}
