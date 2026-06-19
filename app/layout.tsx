import type { Metadata } from 'next';
import './globals.css';
import { ApolloClientProvider } from '@infrastructure/graphql/apollo-provider';
import { AuthProvider } from '@application/auth/auth.context';

export const metadata: Metadata = {
  title: 'IPUL — Administración',
  description: 'Sistema de administración IPUL',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <ApolloClientProvider>{children}</ApolloClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
