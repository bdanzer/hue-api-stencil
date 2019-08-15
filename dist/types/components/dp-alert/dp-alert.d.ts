export declare class DpAlert {
    alerted: boolean;
    text: string;
    ms: number;
    toasty(text: any, alert: any, ms: any): Promise<void>;
    render(): any;
}
