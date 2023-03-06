import getProportionalSize from "./getProportionalSize";
import type { ITextItem } from "../textData";
import { isDEV } from "./getEnvironment";
import { FONT_SIZE } from "../constants";

export default function createTextElem(
	textItem: ITextItem,
	CONTAINER: HTMLDivElement
) {
	const p = document.createElement("p");
	p.classList.add("text-for-the-video");
	p.innerText = textItem.text;
	p.style.color = textItem.color;
	p.style.opacity = "0";
	p.style.fontSize =
		getProportionalSize(CONTAINER, FONT_SIZE).toString() + "px";
	p.style.position = isDEV() ? "absolute" : "fixed";
	p.style.color = textItem.color;

	// positioning is done outside

	if (textItem.centerX) {
		p.style.left = "50%";
		p.style.transform = "translateX(-50%)";
	}

	return p;
}
