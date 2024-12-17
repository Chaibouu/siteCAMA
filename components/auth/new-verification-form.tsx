"use client";

import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { verifyUserToken } from "@/actions/verifyUserToken";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true); // État pour éviter les requêtes répétées

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (success || error || !token) return; // Empêcher une nouvelle soumission si la requête a déjà réussi ou échoué
    const decodedToken = decodeURIComponent(token);
    setIsLoading(true);
    const result = await verifyUserToken(decodedToken);

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setSuccess(result.success);
    }

    setIsLoading(false); // Fin du chargement après la requête
  }, [token, success, error]);

  useEffect(() => {
    if (!token) {
      setError("Token manquant dans l'URL. Veuillez vérifier le lien.");
      setIsLoading(false); 
      return;
    }
    onSubmit(); // Soumettre la requête lors du montage du composant
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        {isLoading && !success && !error && (
          <BeatLoader />
        )}
        <FormSuccess message={success} />
        {!success && (
          <FormError message={error} />
        )}
      </div>
    </CardWrapper>
  );
};
