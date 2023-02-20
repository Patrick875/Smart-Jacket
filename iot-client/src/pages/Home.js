//jshint esversion:9
import React from "react";
import "./../App.css";
import Cards from "./Cards";
import Header from "./Header";

function Home() {
	return (
		<div className="container-fluid m-0 px-0 ">
			<Header />
			<div className=" mt-4 d-flex flex-column container-fluid text-center">
				<p className="h5"> Welcome to your System</p>
				<p> Check on Your team</p>
				<Cards />
			</div>
		</div>
	);
}

export default Home;
