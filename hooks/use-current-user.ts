import { getUser } from "@/actions/getUser";

export const useCurrentUser = async () => {
  const result = await getUser();

  return await result.user;
};
