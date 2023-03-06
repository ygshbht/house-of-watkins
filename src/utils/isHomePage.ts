export default function isHomePage() {
	const { pathname } = window.location;
	const validPaths = ["", "/", "/index.html", "/index.php"];
	return validPaths.includes(pathname);
}
