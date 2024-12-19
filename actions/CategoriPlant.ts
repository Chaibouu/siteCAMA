'use server'
import { makeAuthenticatedRequest } from "./makeAuthenticatedRequest";

export const fetchCategoriPlant = async () => {
    // la fonction makeAuthenticatedRequest va vous permettre de faire vos requête sans vous soucier de l'autorisation, il faut juste lui passer les paramètres de la requête et elle vous renvoie directement la 'data' souhaité
    const test = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/categoriplant`,
      "GET"
    );
  
    // dans ce cas 'test' représente toutes les missions, vous pouvez ensuite envoyer la 'data' comme vous le souhaitez via le 'return'
    return JSON.parse(JSON.stringify(test));
  };



  export const postCategoriPlant = async (body:any) => {
    // la fonction makeAuthenticatedRequest va vous permettre de faire vos requête sans vous soucier de l'autorisation, il faut juste lui passer les paramètres de la requête et elle vous renvoie directement la 'data' souhaité
    const test = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/categoriplant`,
      "POST",
       body
    );
  
    // dans ce cas 'test' représente toutes les missions, vous pouvez ensuite envoyer la 'data' comme vous le souhaitez via le 'return'
    return JSON.parse(JSON.stringify(test));
  };



  export const putCategoriPlant = async (body:any) => {
    // la fonction makeAuthenticatedRequest va vous permettre de faire vos requête sans vous soucier de l'autorisation, il faut juste lui passer les paramètres de la requête et elle vous renvoie directement la 'data' souhaité
    const test = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/categoriplant/${body.id}`,
      "PUT",
       body.body
    );
    // dans ce cas 'test' représente toutes les missions, vous pouvez ensuite envoyer la 'data' comme vous le souhaitez via le 'return'
    return JSON.parse(JSON.stringify(test));
  };



  export const deleteCategoriPlant = async (id:string) => {
    // la fonction makeAuthenticatedRequest va vous permettre de faire vos requête sans vous soucier de l'autorisation, il faut juste lui passer les paramètres de la requête et elle vous renvoie directement la 'data' souhaité
    const test = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/categoriplant/${id}`,
      "DELETE",
    );
  
    // dans ce cas 'test' représente toutes les missions, vous pouvez ensuite envoyer la 'data' comme vous le souhaitez via le 'return'
    return JSON.parse(JSON.stringify(test));
  };