import moment from "moment"; 

export default {
  install: ({ config }) => {
    moment.updateLocale("ar", {
      relativeTime: {
        future: "%s فى",
        past: "منذ %s",
        s: "بضع ثوان",
        ss: "ثواني %d",
        m: "دقيقة",
        mm: "%d دقيقة",
        h: "ساعة",
        hh: "%d ساعة",
        d: "يوم",
        dd: "%d أيام",
        w: "أسبوع",
        ww: "أسابيع %d",
        M: "شهر",
        MM: "شهور %d",
        y: "سنة",
        yy: "سنين %d",
      },
    });
    config.globalProperties.$moment = moment;
    config.globalProperties.$dateTime = (value) => {
      return moment(value)
        .locale("ar")
        .parseZone()
        .local()
        .startOf("minute")
        .fromNow();
    };
  },
};
