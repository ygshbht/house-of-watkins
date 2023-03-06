declare module "*!glsl" {
	const content: string;
	export default content;
}
declare module "*.glsl" {
	const content: string;
	export default content;
}
declare module "*oise.js";
declare module "*oon3D.js";

declare global {
	interface Window {
		VIDEO_LENGTH?: number;
		SCROLL_DISTANCE?: number;
	}
}

export {};
