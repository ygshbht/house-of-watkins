export default function getProportionalSize(
	CONTAINER: HTMLDivElement,
	num: number
) {
	return num * (CONTAINER.offsetWidth / 1920);
}
