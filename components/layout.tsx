import { Footer } from 'components/footer';
import { Header } from 'components/header';
import type { ReactNode } from 'react';

type Props = {
  readonly condensed?: boolean;
  readonly children: ReactNode;
};

export const Layout = ({ children, condensed = false }: Props) => (
  <div className="container mx-auto px-8">
    <div className="mb-10">
      <Header condensed={condensed} />
    </div>
    <hr className="mb-10" />
    <div className="mb-10">{children}</div>
    <hr className="mb-10" />
    <div className="mb-10">
      <Footer />
    </div>
  </div>
);
