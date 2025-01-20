'use server'
import { makeAuthenticatedRequest } from "./makeAuthenticatedRequest";

export const fetchProduit = async () => {
    // la fonction makeAuthenticatedRequest va vous permettre de faire vos requête sans vous soucier de l'autorisation, il faut juste lui passer les paramètres de la requête et elle vous renvoie directement la 'data' souhaité
    const test = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/produit`,
      "GET"
    );
  
    // dans ce cas 'test' représente toutes les missions, vous pouvez ensuite envoyer la 'data' comme vous le souhaitez via le 'return'
    return JSON.parse(JSON.stringify(test.produit));
  };



  export const postProduit = async (body:any) => {
    // la fonction makeAuthenticatedRequest va vous permettre de faire vos requête sans vous soucier de l'autorisation, il faut juste lui passer les paramètres de la requête et elle vous renvoie directement la 'data' souhaité
    const test = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/produit`,
      "POST",
       body
    );
  
    // dans ce cas 'test' représente toutes les missions, vous pouvez ensuite envoyer la 'data' comme vous le souhaitez via le 'return'
    return JSON.parse(JSON.stringify(test));
  };



  export const putProduit = async ({ body, id }: { body: any; id: string }) => {
    console.log(body);
    
    // la fonction makeAuthenticatedRequest va vous permettre de faire vos requête sans vous soucier de l'autorisation, il faut juste lui passer les paramètres de la requête et elle vous renvoie directement la 'data' souhaité
    const test = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/produit/${id}`,
      "PUT",
       body,
       undefined,
       "multipart/form-data"
    );
    // dans ce cas 'test' représente toutes les missions, vous pouvez ensuite envoyer la 'data' comme vous le souhaitez via le 'return'
    return JSON.parse(JSON.stringify(test));
  };



  export const deleteProduit = async (id:string) => {
    // la fonction makeAuthenticatedRequest va vous permettre de faire vos requête sans vous soucier de l'autorisation, il faut juste lui passer les paramètres de la requête et elle vous renvoie directement la 'data' souhaité
    const test = await makeAuthenticatedRequest(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/produit/${id}`,
      "DELETE",
    );
  
    // dans ce cas 'test' représente toutes les missions, vous pouvez ensuite envoyer la 'data' comme vous le souhaitez via le 'return'
    return JSON.parse(JSON.stringify(test));
  };