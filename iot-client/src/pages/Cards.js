import React from "react";
import MinerCard from "./MinerCard";

function Cards() {
	return (
		<div className="d-flex flex-row justify-content-center">
			<MinerCard description={"/user/miner"} />
		</div>
	);
}

export default Cards;
