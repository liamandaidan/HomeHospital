import React, { Component } from 'react'
import '../styles/ErrorPageStyle.css'
import errorpageimg from '../images/404Picture.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'

export class ErrorPage404 extends Component {
	render() {
		return (
			<div className="container">
				<div className="row align-items-center">
					<div className="col">
							<h1>404</h1>
							<h3>Oops! Page Not Found</h3>
							<p>Sorry, the page you are looking for doesn't exist.</p>
							<a href="*" className="btn">Return To Homepage</a>
					</div>
					<div className="col">
						<img src={errorpageimg} alt="Error page Image" />
					</div>
				</div>
			</div>
		)
	}
}
export default ErrorPage404