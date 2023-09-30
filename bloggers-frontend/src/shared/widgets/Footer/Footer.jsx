import React from 'react';
import "./Footer.css";
import { FaFacebookSquare } from 'react-icons/fa';
import { BsInstagram, BsTwitter } from 'react-icons/bs';
import { AiFillYoutube } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className='footer'>
		<div className="col_footer">
			<div className="f-logo_footer">
                <h2>Bloggers</h2>
            </div>
			
			<h4>Contact</h4>
			<p><strong>Address: </strong>246 Mall Road , Street 12, Mumbai</p>
			<p><strong>Phone: </strong>+91 9876543210 / +91 1234567890</p>
			<p><strong>Hours: </strong>10:00 - 18:00, Mon - Sun</p>
			<div className="follow_footer">
				<h4>Follow Us</h4>
				<div className="icon_footer">
                    <FaFacebookSquare className='icon_logos_footer' />
                    <BsInstagram className='icon_logos_footer' />
                    <AiFillYoutube className='icon_logos_footer' />
                    <BsTwitter className='icon_logos_footer' />
				</div>
			</div>
		</div>
		
		<div className="col_footer">
			<h4>About</h4>
			<a href="#">About us</a>
			<a href="#">Privacy Policy</a>
			<a href="#">Terms & Conditions</a>
			<a href="#">Contact Us</a>
		</div>
		
		<div className="col_footer">
			<h4>My Account</h4>
			<a href="#">Sign In</a>
			<a href="#">View Blogs</a>
			<a href="#">My Favourites</a>
			<a href="#">Help</a>
		</div>
		
		{/* <div className="col_footer install_footer">
			<h4>Install App</h4>
			<p>From App Store or Google Play</p>
			<div className="row_footer">
				<img src={App} alt="app" />
				<img src={Play} alt="play" />
			</div>
			<p>Secured Payment Gateways</p>
			<img src={Pay} alt="pay" />
		</div> */}
	</div>
  )
}

export default Footer
