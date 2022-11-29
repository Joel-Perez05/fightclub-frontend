import React, {useContext} from "react";
import { ThemeContext } from "../ThemeContext";

export default function SwitchButton() {
    const theme = useContext(ThemeContext);
    const darkMode = theme.state.darkMode;

    const onClick = () => {
        if (darkMode) {
            theme.dispatch({type: "LIGHTMODE"});
        } else {
            theme.dispatch({type: "DARKMODE"});
        }
    };

    return (
        <button style={{
            border: "1px solid black",
            marginTop: "30px",
            marginLeft: "10px"
            }} 
            className={`btn ${darkMode? "btn-dark": "btn-light"}`} onClick={onClick}>
            {darkMode? "Light": "Dark"}
        </button>
    )
};