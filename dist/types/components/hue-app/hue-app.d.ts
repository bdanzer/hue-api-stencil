import '../../stencil.core';
export declare class HueApp {
    lights: object;
    cards: any;
    cookies: any;
    loading: boolean;
    group: boolean;
    groups: {};
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    controller(): Promise<void>;
    handleGroupLights(): Promise<void>;
    handleLocalSetup(): Promise<void>;
    setLights(): Promise<void>;
    handlePostAuth(): Promise<void>;
    allowRemote(e: any): void;
    handleGroups(_e: any): void;
    render(): JSX.Element[];
}
