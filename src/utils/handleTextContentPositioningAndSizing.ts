import { FONT_SIZE, VIDEO_OFFSET_TOP } from "../constants";
import { textData } from "../textData";
import getProportionalSize from "./getProportionalSize";

export function handleTextContentPositioningAndSizing(
	CONTAINER: HTMLDivElement
) {
	// function getCoords() {
	// 	return VIDEO_ELEM?.getBoundingClientRect();
	// }

	textData.forEach((textItem) => {
		const { elem } = textItem;
		if (elem) {
			const p = elem;

			elem.style.fontSize =
				getProportionalSize(CONTAINER!, FONT_SIZE).toString() + "px";

			if (textItem.left) {
				/** for future ref in case of fixed positining */
				// p.style.left = `${
				// 	getCoords().left + getProportionalSize(parseInt(textItem.left))
				// }px`;
				p.style.left = `${getProportionalSize(
					CONTAINER!,
					parseInt(textItem.left)
				)}px`;
			}
			if (textItem.right) {
				p.style.right = `${getProportionalSize(
					CONTAINER!,
					parseInt(textItem.right)
				)}px`;
			}
			if (textItem.top) {
				p.style.top = `${
					getProportionalSize(CONTAINER!, parseInt(textItem.top)) +
					VIDEO_OFFSET_TOP
				}px`;
			}
		}
	});
}
