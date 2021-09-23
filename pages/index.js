import Head from "next/head";

import {
	XmediumCard,
	SmallCard,
	MediumCard,
	LargeCard,
	Header,
	Footer,
	Banner,
} from "../components";

export default function Home({ exploreData, cardsData }) {
	const imgs = [
		{
			img: "https://a0.muscache.com/im/pictures/ad109d56-2421-40cd-98e6-e114160dc85b.jpg?im_w=480",
			title: "experiences",
			description: "find unforgettable activities near you.",
		},
		{
			img: "https://a0.muscache.com/im/pictures/0ce799cb-7553-4369-be9e-d0011e0ef636.jpg?im_w=480",
			title: "Online Experiences",
			description: "live, interactive activities led by Hosts.",
		},
		{
			img: "https://a0.muscache.com/im/pictures/247a1ea3-946d-4eb8-a6ab-e8b9a66846f4.jpg?im_w=480",
			title: "Featured collection: Wanderlust",
			description: "Travel from home with online Experiences.",
		},
	];

	return (
		<div className="">
			<Head>
				<title>G-dev Airbnb</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Header />
			<Banner />

			<main className="max-w-7xl mx-auto  px-8 sm:px-16">
				<section className="pt-6 ">
					<h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
					{/* pull some data form the server  */}

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{exploreData?.map(({ img, distance, location }) => (
							<SmallCard
								key={img}
								img={img}
								distance={distance}
								location={location}
							/>
						))}
					</div>
				</section>

				<section>
					<h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>
					<div
						className="flex space-x-3 overflow-scroll scrollbar-hide
					p-3 -ml-3"
					>
						{cardsData?.map(({ img, title }) => (
							<MediumCard key={img} img={img} title={title} />
						))}
					</div>
				</section>
				<div>
					<LargeCard
						// img="https://links.papareact.com/4cj"
						img="https://a0.muscache.com/im/pictures/2595054e-d1d9-4fde-8046-58d51fcb3164.jpg?im_w=1440"
						title="Try hosting"
						description="Earn extra income and unlock new opportunities by sharing your space."
						buttonText="Learn more"
					/>
				</div>
				<section>
					<h2 className="text-4xl font-semibold py-8 ">
						Discover things to do
					</h2>
					<div
						className="flex flex-grow space-x-10 pb-8 overflow-scroll scrollbar-hide
					p-3 -ml-3 cursor-pointer "
					>
						{imgs?.map((item, index) => (
							<XmediumCard
								key={index}
								img={item.img}
								title={item.title}
								description={item.description}
							/>
						))}
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}

export async function getStaticProps() {
	const exploreData = await fetch("https://links.papareact.com/pyp").then(
		(res) => res.json()
	);

	const cardsData = await fetch("https://links.papareact.com/zp1").then((res) =>
		res.json()
	);

	return {
		props: {
			exploreData,
			cardsData,
		},
	};
}
