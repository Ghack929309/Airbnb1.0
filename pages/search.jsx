import { useRouter } from "next/dist/client/router";
import { Footer, Header } from "../components";
import format from "date-fns/format";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";

const Search = ({ searchResults }) => {
	const router = useRouter();
	const { location, startDate, endDate, guests } = router.query;
	const formateStartDate = format(new Date(startDate), "dd-MM-yyyy");
	// const formateEndDate = format(new Date(endDate), "yyyy-MM-dd");
	console.log(endDate);
	// const range = `${formateStartDate} - ${formateEndDate}`;
	// console.log(formateEndDate);

	return (
		<div>
			<Header placeholder={`${location} | ${guests} guests`} />
			<main className="flex">
				<section className="flex-grow pt-14 px-6">
					<p className="text-xs">
						300+ Stays {formateStartDate}-for {guests} guests
					</p>
					<h1 className="text-3xl font-semibold mt-2 mb-6">
						Stays in {location}
					</h1>
					<div
						className="hidden lg:inline-flex mb-5 space-x-3
                    text-gray-800 whiteSpace-nowrap"
					>
						<p className="button">Cancellation Flexibility</p>
						<p className="button">Type of Place</p>
						<p className="button">Price</p>
						<p className="button">Rooms and Beds</p>
						<p className="button">More filters</p>
					</div>
					<div className="flex flex-col">
						{searchResults.map(
							({
								img,
								location,
								description,
								star,
								price,
								title,
								total,
								lat,
								long,
							}) => (
								<InfoCard
									key={img}
									img={img}
									location={location}
									description={description}
									star={star}
									price={price}
									title={title}
									total={total}
									lat={lat}
									long={long}
								/>
							)
						)}
					</div>
				</section>
				<section className="hidden xl:inline-flex xl:min-w-[600px]">
					<Map searchResults={searchResults} />
				</section>
			</main>
			<Footer />
		</div>
	);
};

export default Search;

export async function getServerSideProps() {
	const searchResults = await fetch("https://links.papareact.com/isz").then(
		(res) => res.json()
	);

	return {
		props: {
			searchResults,
		},
	};
}
