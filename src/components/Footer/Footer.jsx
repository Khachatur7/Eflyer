import "../Footer/Footer.css";
import Facebook from "../ImagesSVG/FacebookSVG";
import Instagram from "../ImagesSVG/InstagramSVG";
import Telegram from "../ImagesSVG/TelegramSVG";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer_conteiner">
          {" "}
          <div className="logo_copyright">
            <h3 className="footer_logo">Eflyer</h3>
            <div className="copyright">
              {" "}
              <span>Copyright @2024</span>
              <span>All rights reserved</span>
            </div>
            <div className="social">
              <Facebook className="social_child" />
              <Instagram className="social_child" />
              <Telegram className="social_child" />
            </div>
          </div>
          <div className="footer_nav">
            <div className="footer_navbar">
              <div className="footer_navbar_title">
                <span>Company</span>
              </div>
              <ul className="footer_navbar_menu">
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  {" "}
                  <a href="#">Pricing</a>
                </li>
                <li>
                  {" "}
                  <a href="#">About Us</a>
                </li>
                <li>
                  {" "}
                  <a href="#">Contact us</a>
                </li>
                <li>
                  {" "}
                  <a href="#">Testimonials</a>
                </li>
              </ul>
            </div>
            <div className="footer_navbar">
              <div className="footer_navbar_title">
                <span>Menu</span>
              </div>
              <ul className="footer_navbar_menu">
                <li>
                  <a href="#">Best Sellers</a>
                </li>
                <li>
                  {" "}
                  <a href="#">Gift Ideas</a>
                </li>
                <li>
                  <a href="#">New Releases</a>
                </li>
                <li>
                  {" "}
                  <a href="#">Today's Deals</a>
                </li>
                <li>
                  <a href="#">Customer Service</a>
                </li>
              </ul>
            </div>
            <div className="footer_navbar">
              <div className="footer_navbar_title">
                <span>Support</span>
              </div>
              <ul className="footer_navbar_menu">
                <li>
                  <a href="#">Legal policy</a>
                </li>
                <li>
                  <a href="#">Status policy</a>
                </li>
                <li>
                  {" "}
                  <a href="#">Privacy policy</a>
                </li>
                <li>
                  {" "}
                  <a href="#">Terms of service</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer_line"></div>
      </div>
    </footer>
  );
}
