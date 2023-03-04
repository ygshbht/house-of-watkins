import { textData } from "./textData";
import type { ITextItem } from "./textData";
import "./styles.scss";

import getCoords from "./getCoords";

let CONTAINER =
	((window as any).CONTAINER as HTMLDivElement) ||
	(document.querySelector(
		"#container-elem-house-of-watkins-random-name"
	) as HTMLDivElement);

const VIDEO_ELEM = CONTAINER?.querySelector("video") as HTMLVideoElement | null;
const VIDEO_LENGTH = (window as any).VIDEO_LENGTH ?? 28.431995;

const SCROLL_DISTANCE = (window as any).SCROLL_DISTANCE ?? 10000;

const FONT_SIZE = 30;
/** in seconds */
const VIDEO_OFFSET_TOP = isDEV() ? 0 : 96;
const OPACITY_DURATION = 0.5;

function getTotalScrolledTop() {
	if (isDEV()) {
		return getCoords(CONTAINER!).top;
	} else {
		return Math.abs(CONTAINER.getBoundingClientRect().top);
	}
}

function isDEV() {
	return process.env.NODE_ENV === "development";
}
console.log("isDEV", isDEV());

function onDev() {
	document.body.style.height = (SCROLL_DISTANCE * 1.5).toString() + "px";
	document.body.style.position = "relative";
	document.body.style.width = "100vw";
}
isDEV() && onDev();

function isHomePage() {
	const { pathname } = window.location;
	const validPaths = ["", "/", "/index.html", "/index.php"];
	return validPaths.includes(pathname);
}

function onWatchedVideo() {
	textData.forEach((item) => {
		item.elem?.remove();
		delete item.elem;
	});
}

function onScroll() {
	if (!CONTAINER) {
		// CONTAINER = document.querySelector("canvas")
		// 	?.parentElement as HTMLDivElement;
		CONTAINER = document.querySelector("canvas")
			?.parentElement as HTMLDivElement;
		(window as any).CONTAINER = CONTAINER;
	}
	if (!CONTAINER) return;
	let percentScrolled = getTotalScrolledTop() / SCROLL_DISTANCE;
	const watchedDuration = VIDEO_LENGTH * percentScrolled;
	if (VIDEO_ELEM) {
		VIDEO_ELEM.currentTime = watchedDuration;
	}
	if (watchedDuration >= VIDEO_LENGTH) {
		onWatchedVideo();
	}

	// updateTextContent(video.currentTime);
	updateTextContent(watchedDuration);
}

function updateTextContent(currentTime: number) {
	// const currentVideoTime = video.currentTime;
	const currentVideoTime = currentTime;

	textData.forEach((textItem, index) => {
		const textDuration = textItem.duration ?? 3;

		const textEndTime = textItem.time + textDuration;

		if (
			currentVideoTime >= textItem.time &&
			currentVideoTime <= textEndTime &&
			currentTime < VIDEO_LENGTH
		) {
			if (!textItem.elem) {
				textItem.elem = createTextElem(textItem);
				CONTAINER.appendChild(textItem.elem);
			}

			const { elem } = textItem;
			let opacity = 1;
			// fade -in
			if (currentVideoTime < textItem.time + OPACITY_DURATION) {
				opacity = currentVideoTime - textItem.time;
			}
			// fade out
			else if (
				currentVideoTime >
				textItem.time + textDuration - OPACITY_DURATION
			) {
				opacity = textItem.time + textDuration - currentVideoTime;
			} else {
				opacity = 1;
			}

			elem.style.opacity = opacity.toString();
		} else {
			textItem.elem?.remove();
			delete textItem.elem;
		}
		handleTextContentPositioningAndSizing();
	});
}
// video.onclick = () => console.log(video.currentTime);
// window.addEventListener("wheel", onScroll);
// video.addEventListener("timeupdate", onScroll);

function getProportionalSize(num: number) {
	return num * (CONTAINER.offsetWidth / 1920);
}

function handleTextContentPositioningAndSizing() {
	if (!CONTAINER) return;

	function getCoords() {
		return VIDEO_ELEM?.getBoundingClientRect();
	}

	textData.forEach((textItem) => {
		const { elem } = textItem;
		if (elem) {
			const p = elem;

			elem.style.fontSize = getProportionalSize(FONT_SIZE).toString() + "px";

			if (textItem.left) {
				/** for future ref in case of fixed positining */
				// p.style.left = `${
				// 	getCoords().left + getProportionalSize(parseInt(textItem.left))
				// }px`;
				p.style.left = `${getProportionalSize(parseInt(textItem.left))}px`;
			}
			if (textItem.right) {
				p.style.right = `${getProportionalSize(parseInt(textItem.right))}px`;
			}
			if (textItem.top) {
				p.style.top = `${
					getProportionalSize(parseInt(textItem.top)) + VIDEO_OFFSET_TOP
				}px`;
			}
			// console.log(getCoords(p), textItem);
		}
	});
}

function createTextElem(textItem: ITextItem) {
	const p = document.createElement("p");
	p.innerText = textItem.text;
	p.style.color = textItem.color;
	p.style.opacity = "0";
	p.style.fontSize = getProportionalSize(FONT_SIZE).toString() + "px";
	p.style.fontWeight = "250px";
	p.style.position = isDEV() ? "absolute" : "fixed";
	// p.style.color = "red";
	p.style.color = textItem.color;
	p.style.zIndex = "9999";
	p.style.lineHeight = "1.1";

	// positioning is done outside

	if (textItem.centerX) {
		p.style.left = "50%";
		p.style.transform = "translateX(-50%)";
	}

	return p;
}

function isDesktop() {
	return window.innerWidth > 990;
}

document.addEventListener("load", (e) => {
	if (!CONTAINER) {
		CONTAINER =
			(document.querySelector("canvas")?.parentElement as HTMLDivElement) ||
			((window as any).CONTAINER as HTMLDivElement) ||
			(document.querySelector(
				"#container-elem-house-of-watkins-random-name"
			) as HTMLDivElement);
		(window as any).CONTAINER = CONTAINER;
	}
	onLoad();
});
onLoad();
function onLoad() {
	if (isHomePage()) {
		let addedListeners = false;
		if (isDesktop()) {
			document.addEventListener("wheel", onScroll);
			document.addEventListener("scroll", onScroll);
			addedListeners = true;
		}

		window.addEventListener("resize", () => {
			if (isDesktop()) {
				handleTextContentPositioningAndSizing();
				if (!addedListeners) {
					document.addEventListener("wheel", onScroll);
					document.addEventListener("scroll", onScroll);
				}
			} else {
				onWatchedVideo();
				document.removeEventListener("wheel", onScroll);
				document.removeEventListener("scroll", onScroll);
				addedListeners = false;
			}
		});
	}
}
