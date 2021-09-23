import Image from "next/image";

export const XmediumCard = ({ img, title, description }) => {
	return (
		<div>
			<div className="relative h-80 w-80 min-w-[300px] ">
				<Image src={img} layout="fill" className="rounded-xl" />
			</div>
			<h1 className="text-lg font-semibold mt-3">{title}</h1>
			<h3 className="text-sm ">{description}</h3>
		</div>
	);
};
