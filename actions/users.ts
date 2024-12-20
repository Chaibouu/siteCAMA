"use server";

import { makeAuthenticatedRequest } from "./makeAuthenticatedRequest";

export const fetchUsers = async () => {
  // la fonction makeAuthenticatedRequest va vous permettre de faire vos requête sans vous soucier de l'autorisation, il faut juste lui passer les paramètres de la requête et elle vous renvoie directement la 'data' souhaité
  const test = await makeAuthenticatedRequest(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/users`,
    "GET"
  );

  // dans ce cas 'test' représente toutes les missions, vous pouvez ensuite envoyer la 'data' comme vous le souhaitez via le 'return'
    return JSON.parse(JSON.stringify(test));
};



export const postUsers = async (body:any) => {
    // la fonction makeAuthenticatedRequest va vous permettre de faire vos requête sans vous soucier de l'autorisation, il faut juste lui passer les paramètres de la requête et elle vous renvoie directement la 'data' souhaité
    const test = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/users`,
      "POST",
      body
    );
  
    // dans ce cas 'test' représente toutes les missions, vous pouvez ensuite envoyer la 'data' comme vous le souhaitez via le 'return'
  
      return JSON.parse(JSON.stringify(test));
  };


  export const putUsers = async (body:any) => {
    // la fonction makeAuthenticatedRequest va vous permettre de faire vos requête sans vous soucier de l'autorisation, il faut juste lui passer les paramètres de la requête et elle vous renvoie directement la 'data' souhaité
    const test = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/users/${body.id}`,
      "PUT",
      body.body
    );
  
    // dans ce cas 'test' représente toutes les missions, vous pouvez ensuite envoyer la 'data' comme vous le souhaitez via le 'return'
  
      return JSON.parse(JSON.stringify(test));
  };


  export const deleteUsers = async (id:string) => {
    // la fonction makeAuthenticatedRequest va vous permettre de faire vos requête sans vous soucier de l'autorisation, il faut juste lui passer les paramètres de la requête et elle vous renvoie directement la 'data' souhaité
    const test = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/users/${id}`,
      "DELETE",
    );
  
    // dans ce cas 'test' représente toutes les missions, vous pouvez ensuite envoyer la 'data' comme vous le souhaitez via le 'return'
  
      return JSON.parse(JSON.stringify(test));
  };


  export const activer = async (id:string) => {
    // la fonction makeAuthenticatedRequest va vous permettre de faire vos requête sans vous soucier de l'autorisation, il faut juste lui passer les paramètres de la requête et elle vous renvoie directement la 'data' souhaité
    const test = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/users/${id}/reactivate`,
      "PATCH",
    );
  
    // dans ce cas 'test' représente toutes les missions, vous pouvez ensuite envoyer la 'data' comme vous le souhaitez via le 'return'
  
      return JSON.parse(JSON.stringify(test));
  };


  export const desactiver = async (id:string) => {
    // la fonction makeAuthenticatedRequest va vous permettre de faire vos requête sans vous soucier de l'autorisation, il faut juste lui passer les paramètres de la requête et elle vous renvoie directement la 'data' souhaité
    const test = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/users/${id}/deactivate`,
      "PATCH",
    );
  
    // dans ce cas 'test' représente toutes les missions, vous pouvez ensuite envoyer la 'data' comme vous le souhaitez via le 'return'
  
      return JSON.parse(JSON.stringify(test));
  };