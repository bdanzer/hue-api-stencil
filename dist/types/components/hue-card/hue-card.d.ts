export declare class HueCard {
    bri: any;
    on: boolean;
    mode: string;
    alert: string;
    reachable: boolean;
    lightName: string;
    lightId: string;
    rangeChagned(data: any): void;
    handleLightOff(lightId: any): void;
    toggle(): void;
    getPercentage(number: any): number;
    switchClicked(_e: any): void;
    render(): any[];
}
