// flow-typed signature: 4ab23419cd270d646fd917b9a32c8214
// flow-typed version: c6154227d1/react-native-orientation-locker_v1.x.x/flow_>=v0.72.0 <=v0.103.x

declare module "react-native-orientation-locker" {
  declare export type Orientations =
    | "PORTRAIT"
    | "LANDSCAPE-LEFT"
    | "LANDSCAPE-RIGHT"
    | "PORTRAIT-UPSIDEDOWN" //  not support at iOS now
    | "UNKNOWN";

  declare class Orientation {
    static addOrientationListener((payload: Orientations) => void): void;
    static removeOrientationListener((payload: Orientations) => void): void;

    static getInitialOrientation(): Orientations;

    static getOrientation((payload: Orientations) => void): void;

    static lockToLandscape(): void;
    static lockToLandscapeLeft(): void;
    static lockToLandscapeRight(): void;
    static lockToPortrait(): void;
    static lockToPortraitUpsideDown(): void;

    static unlockAllOrientations(): void;
  }

  declare export default typeof Orientation;
}
