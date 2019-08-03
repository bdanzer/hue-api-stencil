import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class Range {
    rangeValue: string;
    min: string;
    max: string;
    data: any;
    ariaLabel: string;
    ariaValueNow: number;
    disabled: boolean;
    rangeChagned: EventEmitter;
    inputChanged: EventEmitter;
    render(): JSX.Element;
}
