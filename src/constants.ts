import { isDEV } from "./utils/getEnvironment";

export const VIDEO_LENGTH = window.VIDEO_LENGTH ?? 28.431995;
export const SCROLL_DISTANCE = window.SCROLL_DISTANCE ?? 10000;
export const FONT_SIZE = 30;
export const VIDEO_OFFSET_TOP = isDEV() ? 0 : 96;
/** in seconds */
export const OPACITY_DURATION = 0.5;
