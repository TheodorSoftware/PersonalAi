import { MouseEventHandler, ReactNode } from "react";

export default interface AbstractModalProps{
    children: ReactNode,
    isOpen: boolean,
    closeModal: MouseEventHandler<HTMLDivElement>
}