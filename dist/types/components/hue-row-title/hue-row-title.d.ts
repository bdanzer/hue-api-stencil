import { EventEmitter } from '../../stencil.core';
export declare class HueRowTitle {
    title: string;
    groupId: string;
    reachable: any;
    any_on: boolean;
    groupData: any;
    GroupOff: EventEmitter;
    handleSwitch(_e: any): void;
    toggle(): void;
    render(): any;
}
