import { textData } from "./textData";
import type { ITextItem } from "./textData";
import "./styles.scss";
const video = document.querySelector("video") as HTMLVideoElement;
import getCoords from "./getCoords";

const container = document.querySelector("#container")!;

const FONT_SIZE = 30;
const OPACITY_DURATION = 0.5;
const SCROLL_DISTANCE = 10000;

/** in seconds */
const VIDEO_LENGTH = 28.431995;

function getTotalScrolledTop() {
	return getCoords(video).top;
}

document.body.style.height = (SCROLL_DISTANCE * 1.5).toString() + "px";

function onWatchedVideo() {
	textData.forEach((item) => {
		item.elem?.remove();
		delete item.elem;
	});
}

function onScroll() {
	let percentScrolled = getTotalScrolledTop() / SCROLL_DISTANCE;
	const watchedDuration = VIDEO_LENGTH * percentScrolled;
	video.currentTime = watchedDuration;

	if (watchedDuration >= VIDEO_LENGTH) onWatchedVideo();

	// updateTextContent(video.currentTime);
	updateTextContent(watchedDuration);
}

function updateTextContent(currentTime: number) {
	// const currentVideoTime = video.currentTime;
	const currentVideoTime = currentTime;
	const textDuration = 3;

	textData.forEach((textItem, index) => {
		const textEndTime = textItem.time + textDuration;

		// if (index === 0) {
		// 	console.log(
		// 		currentVideoTime >= textItem.time,
		// 		currentVideoTime <= textEndTime
		// 	);
		// }

		if (currentVideoTime >= textItem.time && currentVideoTime <= textEndTime) {
			if (!textItem.elem) {
				textItem.elem = createTextElem(textItem);
				container.appendChild(textItem.elem);
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

document.addEventListener("wheel", (e) => {
	onScroll();
	// video.currentTime += 0.1 * (Math.abs(e.deltaY) / e.deltaY);
});

function getProportionalSize(num: number) {
	return num * (video.offsetWidth / 1920);
}

window.addEventListener("resize", () => {
	handleTextContentPositioningAndSizing();
});

function handleTextContentPositioningAndSizing() {
	function getCoords() {
		return video.getBoundingClientRect();
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
				p.style.top = `${getProportionalSize(parseInt(textItem.top))}px`;
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
	// p.style.position = "absolute";
	p.style.color = "red";
	p.style.zIndex = "9999";

	// positioning is done outside

	if (textItem.centerX) {
		p.style.left = "50%";
		p.style.transform = "translateX(-50%)";
	}

	return p;
}
