import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import getCenter from "geolib/es/getCenter";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";

const Map = ({ searchResults }) => {
	const [selectedLocation, setSelectedLocation] = useState({});
	//transforming the search results object into the :
	// {latitude: 37.7577, longitude:0989} object
	const coordinates = searchResults.map((result) => ({
		latitude: result.lat,
		longitude: result.long,
	}));
	const center = getCenter(coordinates);
	const [viewport, setViewPort] = useState({
		width: "100%",
		height: "100%",
		latitude: center.latitude,
		longitude: center.longitude,
		zoom: 11,
	});
	console.log(searchResults);

	return (
		<ReactMapGL
			mapStyle="mapbox://styles/ghack/cktwhr7dn0sdn17nvpjkvy88r"
			mapboxApiAccessToken={process.env.mapbox_Key}
			{...viewport}
			onViewportChange={(nexViewport) => setViewPort(nexViewport)}
		>
			{searchResults.map((result) => (
				<div>
					<Marker
						key={result.long}
						longitude={result.long}
						latitude={result.lat}
						offsetLeft={-20}
						offsetTop={-10}
					>
						<p
							onClick={() => setSelectedLocation(result)}
							className="text-2xl cursor-pointer animate-bounce"
							aria-label="push-pin"
						>
							📌
						</p>
					</Marker>
					{/* the popup that should show if we click on a Marker */}
					{selectedLocation.long === result.long ? (
						<Popup
							onClose={() => setSelectedLocation({})}
							closeOnClick={true}
							latitude={result.lat}
							longitude={result.long}
						>
							<section className="grid ">
								<div className=" col-span-1 relative h-60 w-80 bg-gray-100 rounded-xl p-8">
									{
										<Image
											src={result.img}
											layout="fill"
											className="  mx-auto"
										/>
									}
								</div>
								<div className=" grid-rows-1 justify-items-start pt-6  text-center space-y-4 text-lg font-semibold">
									<p>{result.title}</p>
									<div className=" mt-2 space-x-2 ">
										<StarIcon className="text-red-500 h-5" />
										<p className="mt-0">{result.star}</p>
									</div>
								</div>
							</section>
						</Popup>
					) : null}
				</div>
			))}
		</ReactMapGL>
	);
};

export default Map;
