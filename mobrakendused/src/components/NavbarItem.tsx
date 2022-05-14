import React from 'react';
import { View, Text } from 'react-native';
import styles from "./styles";
import { Link, useLocation } from "react-router-dom";

type NavbarItemProps = {
  route: string,
  text: string
}

const NavbarItem = (props: NavbarItemProps) => {
  const pathName = useLocation().pathname;

  return (
    <View style={styles.navbar_item}>
      <Link to={props.route} style={{textDecorationLine:"none"}}>
        <View style={
          pathName === props.route
          ? [styles.navbar_item_link_view, styles.navbar_item_link_viewHighlight]
          : styles.navbar_item_link_view}
        >
          <Text style={styles.navbar_item_link_view_text}>
            {props.text}
          </Text>
        </View>        
      </Link>
    </View>
  );
}

export default NavbarItem;