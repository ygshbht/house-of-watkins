export function isDEV() {
	return process.env.NODE_ENVIRONMENT === "development";
}

export function isProd() {
	return !isDEV();
}

(window as any).isDev = isDEV();
