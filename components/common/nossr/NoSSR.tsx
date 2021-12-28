import dynamic from 'next/dynamic';
import React from 'react';

const Base: React.FC = ({ children }) => <>{children}</>;

export const NoSSR = dynamic(Promise.resolve(Base), { ssr: false });
