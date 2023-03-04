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

export const textData: ITextItem[] = [
	{
		text: `Live-Chat With
        Award-Winning
        Designer David
        Watkins`,
		time: 2.2,
		duration: 4,
		color: "black",
		left: "642px",
		top: "150px",
	},
	{
		text: `And Make Changes To
		Your Plan in Real Time
		`,
		time: 4.2,
		duration: 2,

		color: "black",
		left: "642px",
		top: "300px",
	},
	{
		text: `You Will Need
		A Site Plan`,
		time: 6.2,
		duration: 3.8,

		color: "black",
		left: "643px",
		top: "204px",
	},
	{
		text: "We Can Provide It",
		time: 8,
		duration: 2,
		color: "black",
		left: "643px",
		top: "312px",
	},
	{
		text: `You will need to Meet HOA Guidelines.
        We'll Make sure You Do`,
		time: 10.75,
		duration: 5,
		color: "white",
		left: "595px",
		top: "436px",
	},
	{
		text: `All Of Our Homes Are
        Designed By Award-
        Winning Designer
        David Watkins`,
		time: 17,
		duration: 3,
		color: "white",
		left: "545px",
		top: "128px",
	},
	{
		text: `Value-Engineered To Save Money`,
		time: 20,
		duration: 4.5,
		color: "black",
		right: "200px",
		top: "171px",
	},
	{
		text: `Energy Efficient To Keep Saving Money`,
		time: 23,
		duration: 1.5,
		color: "black",
		right: "200px",
		top: "252px",
	},
	{
		text: `Shop David's Most Popular Home Plans`,
		time: 26,
		color: "black",
		centerX: true,
		top: "200px",
	},
	{
		text: `& Schedule A Free Call Today`,
		time: 26.5,
		color: "black",
		centerX: true,
		top: "310px",
	},
];
