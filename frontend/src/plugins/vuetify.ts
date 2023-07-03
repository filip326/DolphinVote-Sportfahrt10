import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import * as mdiIcons from "vuetify/iconsets/mdi";

const iconSet = {
  defaultSet: "mdi",
  aliases: mdiIcons.aliases,
  sets: {
    mdi: mdiIcons.mdi,
  }
};

export default createVuetify({
    theme: {
        defaultTheme: "dark",
    },
    icons: iconSet,
    components,
    directives
})