"use client";

import { UserRole } from "@prisma/client";
import { FormError } from "@/components/form-error";
import { useSession } from "@/context/SessionContext";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
};

export const RoleGate = ({
  children,
  allowedRole,
}: RoleGateProps) => {
  const {user} = useSession()

  if (user?.role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content!" />
    )
  }

  return (
    <>
      {children}
    </>
  );
};
