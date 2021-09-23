import Image from "next/image";
export const LargeCard = ({ img, title, description, buttonText }) => {
	return (
		<section className="relative py-16 cursor-pointer">
			<div className="relative h-96 min-w-[300px]">
				<Image
					src={img}
					layout="fill"
					objectFit="cover"
					className="rounded-2xl"
				/>
			</div>
			<div className="absolute top-32 left-12 ">
				<h3 className="text-4xl mb-3 w-60 text-white ">{title}</h3>
				<p className="text-white text-sm w-60">{description}</p>
				<button
					className="text-sm text-gray-900 
                 bg-white px-4 py-2 rounded-lg mt-5"
				>
					{buttonText}
				</button>
			</div>
		</section>
	);
};
