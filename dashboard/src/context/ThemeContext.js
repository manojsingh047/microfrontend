import { createContext } from "react";

export const Themes = {
    light: "light",
    dark: "dark"
}
const ThemeContext = createContext(Themes.light);
export default ThemeContext;