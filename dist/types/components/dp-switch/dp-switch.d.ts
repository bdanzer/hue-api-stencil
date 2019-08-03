import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class Switch {
    switchClicked: EventEmitter;
    isChecked: boolean;
    data: any;
    label: string;
    ariaLabel: string;
    callback: Function;
    disabled: boolean;
    handleKeys(ev: KeyboardEvent): void;
    render(): JSX.Element;
}
