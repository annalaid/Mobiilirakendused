import React from 'react';
import { View } from 'react-native';
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
