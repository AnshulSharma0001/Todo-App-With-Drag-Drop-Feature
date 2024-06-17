import moonIcon from "../images/icon-moon.svg";
import sunIcon from "../images/icon-sun.svg";

function Header(props) {

    // Initializing themeLogo and themeAlt which will contain theme icon and its alternate text for image element in header.
    let themeLogo;
    let themeAlt;

    // If theme is light then set theme logo to moon icon and alt text accordingly else set the opposite logo and alt text.
    if (props.theme === "light") {
        themeLogo = moonIcon;
        themeAlt = "Shift to dark mode";
    } else {
        themeLogo = sunIcon;
        themeAlt = "Shift to light mode.";
    }

    return (
        <>
        <header id="header" className="flex">
            <h1>Todo</h1>
            <button id="changeThemeBtn" onClick={props.changeTheme}>
                <img src={themeLogo} alt={themeAlt} />
            </button>
        </header>
        </>
    )
}

export default Header;