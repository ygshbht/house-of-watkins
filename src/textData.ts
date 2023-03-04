/** @property time: in seconds */
export interface ITextItem {
	text: string;
	time: number;
	color: "black" | "white";
	left?: string;
	right?: string;
	top?: string;
	duration?: number;
	centerX?: boolean;
	elem?: HTMLParagraphElement;
}
/** */
export const textData: ITextItem[] = [
	{
		text: `Live-Chat With
        Award-Winning
        Designer David
        Watkins`,
		time: 1.5,
		duration: 5.97 - 1.5,
		color: "black",
		left: "642px",
		top: "150px",
	},
	{
		text: `And Make Changes To
		Your Plan in Real Time
		`,
		time: 3.2,
		duration: 5.97 - 3.2,

		color: "black",
		left: "642px",
		top: "330px",
	},
	{
		text: `You Will Need
		A Site Plan`,
		time: 6.2,
		duration: 10.23 - 6.2,

		color: "black",
		left: "643px",
		top: "204px",
	},
	{
		text: "We Can Provide It",
		time: 7.5,
		duration: 10.23 - 7.5,
		color: "black",
		left: "643px",
		top: "312px",
	},
	{
		text: `You may need to Meet HOA Guidelines.
        We'll Make sure You Do`,
		time: 10.75,
		duration: 5,
		color: "white",
		left: "595px",
		top: "466px",
	},
	{
		text: `All Of Our Homes Are
        Designed By Award-
        Winning Designer
        David Watkins`,
		time: 16.77,
		duration: 3,
		color: "white",
		left: "545px",
		top: "128px",
	},
	{
		text: `Value-Engineered To Save Money`,
		time: 20,
		duration: 4.2,
		color: "black",
		right: "200px",
		top: "171px",
	},
	{
		text: `Energy Efficient To Keep Saving Money`,
		time: 23,
		duration: 1.2,
		color: "black",
		right: "200px",
		top: "252px",
	},
	{
		text: `Shop David's Most Popular Home Plans`,
		time: 25,
		duration: 2.7,
		color: "black",
		centerX: true,
		top: "200px",
	},
	{
		text: `& Schedule A Free Call Today`,
		time: 25.5,
		duration: 2.2,
		color: "black",
		centerX: true,
		top: "310px",
	},
];
