'use server'
import { makeAuthenticatedRequest } from "./makeAuthenticatedRequest";

export const fetchPlant = async () => {
    // la fonction makeAuthenticatedRequest va vous permettre de faire vos requête sans vous soucier de l'autorisation, il faut juste lui passer les paramètres de la requête et elle vous renvoie directement la 'data' souhaité
    const test = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/plant`,
      "GET"
    );
  
    // dans ce cas 'test' représente toutes les missions, vous pouvez ensuite envoyer la 'data' comme vous le souhaitez via le 'return'
    return JSON.parse(JSON.stringify(test));
  };



  export const postPlant = async (body:any) => {
    // la fonction makeAuthenticatedRequest va vous permettre de faire vos requête sans vous soucier de l'autorisation, il faut juste lui passer les paramètres de la requête et elle vous renvoie directement la 'data' souhaité
    const test = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/plant`,
      "POST",
       body
    );
  
    // dans ce cas 'test' représente toutes les missions, vous pouvez ensuite envoyer la 'data' comme vous le souhaitez via le 'return'
    return JSON.parse(JSON.stringify(test));
  };



  export const putPlant = async (body:any) => {
    // la fonction makeAuthenticatedRequest va vous permettre de faire vos requête sans vous soucier de l'autorisation, il faut juste lui passer les paramètres de la requête et elle vous renvoie directement la 'data' souhaité
    const test = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/plant/${body.id}`,
      "PUT",
       body.body
    );
    // dans ce cas 'test' représente toutes les missions, vous pouvez ensuite envoyer la 'data' comme vous le souhaitez via le 'return'
    return JSON.parse(JSON.stringify(test));
  };



  export const deletePlant = async (id:string) => {
    // la fonction makeAuthenticatedRequest va vous permettre de faire vos requête sans vous soucier de l'autorisation, il faut juste lui passer les paramètres de la requête et elle vous renvoie directement la 'data' souhaité
    const test = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/plant/${id}`,
      "DELETE",
    );
  
    // dans ce cas 'test' représente toutes les missions, vous pouvez ensuite envoyer la 'data' comme vous le souhaitez via le 'return'
    return JSON.parse(JSON.stringify(test));
  };