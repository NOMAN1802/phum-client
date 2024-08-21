import { ReactNode } from "react";

export type TRoutre = {
    path: string, 
    element: ReactNode,
};


export type TUserPath ={

    name: string,
    path?: string,
    element?: ReactNode,
    children?: TUserPath[],
};


export type TSidebarItem ={
    key: string,
    label: ReactNode,
    children?: TSidebarItem[],

} | undefined