import type { ReactNode } from 'react';

export type SearchParams = Record<string, string | string[] | undefined>;

export interface ChildrenProps {
    children: ReactNode;
}
