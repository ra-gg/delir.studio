import media from "styled-media-query";

export const cssVars = {
  colors: {
    theming: "#7b14ea",
    appBg: "#353535"
  },
  media: {
    desktop: media.greaterThan("48em" as any),
    mobile: media.lessThan("48em" as any)
  }
};
