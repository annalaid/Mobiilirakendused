import { StyleSheet } from 'react-native';

const colorMain = "#006bb3";
const colorMainHighlight = "#004d80";
const colorSecond = "#eee";
const colorSecondHighlight = "#ddd";

const colorMainText = colorSecond;
const colorSecondText = "000";

const colorInfo = "#bbb";
const colorInfoText = colorSecondText;

const navbarHeight = "80px";

const titleMargin = "1em";


export default StyleSheet.create({
  navbar: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    height: navbarHeight,
    display: "flex",
    flexDirection: "row"
  },
  navbar_item: {
    flex: 1,
    listStyle: "none",
    backgroundColor: colorMain,
    textAlign: "center"
  },
  navbar_item_link_view: {
    height: navbarHeight,
    flexDirection: "column",
    justifyContent: "center"
  },
  navbar_item_link_viewHighlight: {
    backgroundColor: colorMainHighlight
  },
  navbar_item_link_view_text: {
    color: colorSecond,
    fontSize: 24,

  },

  calendarWrapper: {
    flexDirection: "column",
    marginBottom: navbarHeight
  },
  calendarTitleListList: {
    backgroundColor: colorMain,
    paddingBottom: titleMargin,
    flexDirection: "column"
  },
  calendarTitleList: {
    flexDirection: "row",
    alignItems: "center"
  },
  calendarTitle: {
    flex: 1,
    marginTop: titleMargin
  },
  calendarTitleText: {
    flex: 1,
    textAlign: "center",
    color: colorMainText,
    fontSize: 16
  },
  calendarDayList: {
    paddingBottom: "0.25em",
    marginTop: "1em",
    flexDirection: "column"
  },
  calendarDay: {
    marginTop: "0.25em",
    flexDirection: "row"
  },
  calendarDayHighlight: {
    backgroundColor: colorSecondHighlight
  },
  calendarDayEntryList: {
    flex: 8,
    flexDirection: "column"
  },
  calendarEntry: {
    marginVertical: "0.25em"
  },
  calendarDayInfo: {
    flex: 4,
    marginLeft: "0.25em",
    flexDirection: "column"
  },
  calendarText: {
    paddingHorizontal: "1em",
    marginVertical: "0.25em",
    fontSize: 16
  },
  newText: {
    fontSize: 24
  },
  newAttribute: {
    paddingHorizontal: "1em",
    paddingVertical: "1em"
  },
  newAttributeHighlight: {
    backgroundColor: colorSecondHighlight
  }
  /*
  day: {
    flexDirection: "row",
    marginTop: "0.25em",
  },
  dayEntryList: {
    flex: 8,
    flexDirection: "column",
    backgroundColor: colorSecond
  },
  entry: {
    marginVertical: "0.25em"
  },
  dayInfo: {
    flex: 4,
    flexDirection: "column",
    marginLeft: "0.25em",
    backgroundColor: colorSecond
  },
  text: {
    paddingHorizontal: "1em",
    marginVertical: "0.25em",
    color: colorSecondText,
    fontSize: 16
  },
  titleList: {
    flexDirection: "row",
    paddingTop: "1em",
    alignContent: "center"
  },
  titleTitle: {
    flex: 8,
    flexDirection: "row",
  },
  titleText: {
    flex: 4,
    justifyContent: "center",
    textAlign: "center",
    fontSize: 24,
    color: colorMainText,
  },
  titleButton: {
    flex: 4,
    marginVertical: "0.25em",
  }
  */
});