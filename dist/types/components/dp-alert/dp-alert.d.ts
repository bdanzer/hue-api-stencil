import '../../stencil.core';
export declare class DpAlert {
    alerted: boolean;
    text: string;
    ms: number;
    componentDidLoad(): void;
    componentWillUpdate(): void;
    test(): Promise<void>;
    toasty(text: any, alert: any, ms: any): Promise<void>;
    render(): JSX.Element;
}
