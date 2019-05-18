import React, { useState, Fragment } from "react";
import axios from "axios";
import MaskedInput from 'react-text-mask';

const ZipCode = (props) => {
	const [zipCodeInfo, setZipCodeInfo] = useState({});

	const zipChange = (e) => {
		if (e.target.value && e.target.value.length === 5) {
			axios
				.get(`https://www.wsjwine.com/api/address/zipcode/${e.target.value}`)
				.then(res => {
					const response = res.data.response;

					if (response.stateName === "Connecticut") {
						response.warning = "Upon completion of this form, your order will be forwarded to The Wine Cellar, located in Wallingford, CT for processing and shipping.";
					}

					setZipCodeInfo(response);
				}).catch(() => {
					setZipCodeInfo({
						error: "Please enter a valid zip code and try again."
					})
				})
		}
	}

	return (
		<Fragment>
			<form onSubmit={e => e.preventDefault()}>
				<div className="form-row">
					<div className="form-group col-md-2">
						<label htmlFor="inputZIP4">
							<span className="red-asterisk">*</span>&nbsp;
							ZIP
						</label>
						<MaskedInput 
							className="form-control" 
							id="inputZIP4" 
							autoComplete="off"
							mask={[/\d/, /\d/, /\d/, /\d/, /\d/]} 
							guide={false}
							onChange={zipChange}
						/>
					</div>
					<div className="form-group col-md-5 state-city-info">
						{!zipCodeInfo.zipCode && (
							<i>Enter ZIP to populate City and State</i>
						)}
						{zipCodeInfo.zipCode && (
							<span>
								{zipCodeInfo.city}
								{zipCodeInfo.city && zipCodeInfo.stateName && ', '}
								{zipCodeInfo.stateName}
							</span>
						)}
					</div>
				</div>
				<div className="row">
					<div className="col-md-9">
						{zipCodeInfo.error && (
							<div className="alert alert-danger">
								{zipCodeInfo.error}
							</div>
						)}
						{zipCodeInfo.warning && (
							<div className="alert alert-warning">
								{zipCodeInfo.warning}
							</div>
						)}
					</div>
				</div>
			</form>
		</Fragment>
	)
}

export default ZipCode;