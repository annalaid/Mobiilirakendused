import React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import { Link } from "react-router-dom";
import NavbarItem from "./NavbarItem";
import styles from "./styles";

const Navbar = () => {
    return (
        <View style={styles.navbar}>
            <NavbarItem route="/Calendar" text="Calendar"></NavbarItem>
            <NavbarItem route="/Today" text="Today"></NavbarItem>
            <NavbarItem route="/New" text="New"></NavbarItem>
        </View>
    );
}
export default Navbar;
