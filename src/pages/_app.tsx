import { AppProps } from 'next/app';
import { Header } from '../components/Header/index';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';

import  '../styles/global.scss';
import { PrismicProvider } from '@prismicio/react';
import { linkResolver, repositoryName } from '../../prismicio';
import { PrismicPreview } from '@prismicio/next';
import Link from 'next/link';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <PrismicProvider 
        linkResolver={linkResolver}
        internalLinkComponent={({ href, children, ...props}) => (
          <Link href={href}>
            <a {...props}>
              {children}
            </a>
          </Link>
        )}>
        <PrismicPreview repositoryName={repositoryName}>
          <Header />
          <Component {...pageProps} />
        </PrismicPreview>
      </PrismicProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
