import { Footer } from 'components/footer';
import { Header } from 'components/header';
import type { FC } from 'react';

type Props = {
  readonly condensed?: boolean;
};

export const Layout: FC<Props> = ({ children, condensed = false }) => (
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
