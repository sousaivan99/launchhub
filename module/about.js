// About Page
import "@css/about.css";
function About() {
  return (
    <>
      <div className="about-cont">
        <h3>About</h3>
        <p>
          Welcome to LaunchHUB, your go-to website for tracking upcoming launches from all Agency's like SpaceX, Blue Origin! Whether you're a space enthusiast, or just curious about the latest space missions, LaunchHUB has got you covered.
        </p>
        <h4>

          Features
        </h4>
        <p>
          LaunchHUB offers a range of features to keep you updated and informed about all the launches:
        </p>
        <ul>

          <li>
            Get to see the next Upcoming launches.
          </li>
          <li>
            Countdown Timer on Page and on the Tab of the Page and small confetti celebration when countdown hits T-0

          </li>
          <li>
            Agency information (Only SpaceX now more to come later)
          </li>
        </ul>
      </div>
    </>
  );
}

export default About;
