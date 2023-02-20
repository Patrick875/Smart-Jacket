import React from "react";
import { Link } from "react-router-dom";

function MinerCard({ description }) {
	return (
		<div className="col-xl-3 col-sm-6 mb-5 mx-2">
			<Link
				className="bg-white rounded shadow py-5 px-4 d-block text-decoration-none"
				to="/user/miner">
				<img
					src="https://bootstrapious.com/i/snippets/sn-team/teacher-2.jpg"
					alt=""
					width="100"
					className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
				/>
				<p className="mb-0 text-decoration-none h5 text-secondary">
					Dei Francois
				</p>
				<span className="small text-uppercase text-muted">458902</span>
			</Link>
		</div>
	);
}

export default MinerCard;
