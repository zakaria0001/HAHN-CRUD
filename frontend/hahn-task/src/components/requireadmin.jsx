import React, { useEffect } from 'react';
import { useKeycloak } from '@react-keycloak/web';

export default function RequireAdmin({ children }) {
  const { keycloak, initialized } = useKeycloak();

  useEffect(() => {
    if (initialized && !keycloak.authenticated) {
      keycloak.login();
    }
  }, [initialized, keycloak]);

  if (!initialized) return <div>Loading auth...</div>;
  if (!keycloak.authenticated) return <div>Redirecting to login...</div>;

  const isAdmin = keycloak.hasRealmRole('admin');

  if (!isAdmin) {
    return <div className="text-center text-red-600 mt-10">Access denied: Admins only</div>;
  }

  return <>{children}</>;
}
