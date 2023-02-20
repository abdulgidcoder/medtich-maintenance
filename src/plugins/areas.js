export default {
  install: ({ config }) => {
    config.globalProperties.$nameArea = (name) => {
      let areas = [
        { value: "riyadh", label: "الرياض" },
        { value: "makkah", label: "مكة المكرمة" },
        { value: "almadinah", label: "المدينة المنورة" },
        { value: "alqassim", label: "القصيم" },
        { value: "eastern", label: "الشرقية" },
        { value: "aseer", label: "عسير" },
        { value: "tabuk", label: "تبوك" },
        { value: "hail", label: "حائل" },
        { value: "northern-borders", label: "الحدود الشمالية" },
        { value: "jazan", label: "جازان" },
        { value: "najran", label: "نجران" },
        { value: "albahah", label: "الباحة" },
        { value: "aljowf", label: "الجوف" },
      ];
      let areaLable = "";
      areas.map((area) => {
        if (area.value == name) {
          areaLable = area.label;
        }
      });
      return areaLable;
    };
  },
};
