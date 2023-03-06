import { textData } from "./textData";
import "./styles.scss";
import getCoords from "./getCoords";
import { isDEV, isProd } from "./utils/getEnvironment";
import isHomePage from "./utils/isHomePage";
import isDesktop from "./utils/isDesktop";
import createTextElem from "./utils/createTextElem";
import { OPACITY_DURATION, SCROLL_DISTANCE, VIDEO_LENGTH } from "./constants";
import { handleTextContentPositioningAndSizing } from "./utils/handleTextContentPositioningAndSizing";

let CONTAINER: HTMLDivElement | undefined;

function getTotalScrolledTop(CONTAINER: HTMLDivElement) {
	if (isDEV()) {
		return getCoords(CONTAINER).top;
	} else {
		return Math.abs(CONTAINER.getBoundingClientRect().top);
	}
}

function onDev() {
	document.body.style.height = (SCROLL_DISTANCE * 1.5).toString() + "px";
	document.body.style.position = "relative";
	document.body.style.width = "100vw";
}
isDEV() && onDev();

function onWatchedVideo() {
	textData.forEach((item) => {
		item.elem?.remove();
		delete item.elem;
	});
}

function trySettingContainer() {
	if (!CONTAINER) {
		if (isDEV()) {
			document.querySelector(
				"#container-elem-house-of-watkins-random-name"
			) as HTMLDivElement;
		} else if (isProd()) {
			CONTAINER = document.querySelector("canvas")
				?.parentElement as HTMLDivElement;
		}
	}
}

function onScroll() {
	if (!CONTAINER) {
		trySettingContainer();
	}
	if (!CONTAINER) return;
	let percentScrolled = getTotalScrolledTop(CONTAINER) / SCROLL_DISTANCE;
	const watchedDuration = VIDEO_LENGTH * percentScrolled;

	const VIDEO_ELEM = CONTAINER?.querySelector(
		"video"
	) as HTMLVideoElement | null;

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
	if (!CONTAINER) return;

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
				textItem.elem = createTextElem(textItem, CONTAINER!);
				CONTAINER!.appendChild(textItem.elem);
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
		handleTextContentPositioningAndSizing(CONTAINER!);
	});
}

document.addEventListener("load", (e) => {
	trySettingContainer();
	onLoad();
});
trySettingContainer();
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
				CONTAINER && handleTextContentPositioningAndSizing(CONTAINER);
				if (!addedListeners) {
					document.addEventListener("wheel", onScroll);
					document.addEventListener("scroll", onScroll);
					addedListeners = true;
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
