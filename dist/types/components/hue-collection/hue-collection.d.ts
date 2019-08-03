import '../../stencil.core';
export declare class HueCollection {
    loading: boolean;
    lights: any;
    group: boolean;
    groups: object;
    getCards(): JSX.Element;
    getGroups(): any[];
    render(): JSX.Element;
}
