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
     config.globalProperties.$nameSpac = (name) => {
       let specialization = [
         { value: "dental", label: "طب الأسنان" },
         { value: "dental-x-ray", label: "طب الأسنان والأشعة" },
         { value: "dermatology", label: "الجلدية" },
         { value: "endoscopy", label: "المناظير" },
         { value: "laboratory", label: "المختبرات" },
         { value: "ent", label: "الأنف واذن والحنجرة" },
         { value: "or", label: "or قسم العمليات" },
         { value: "physiotherapy", label: "العلاج الطبيعى" },
         { value: "radiology", label: "الأشعة" },
         { value: "sterilization-cssd", label: "قسم تعقيم" },
         { value: "sterilization-endoscopy", label: "التعقيم - المناظير" },
         { value: "sterilization-lab", label: "قسم التعقيم المختبرات" },
       ];
       let spacLable = "";
       specialization.map((spac) => {
         if (spac.value == name) {
           spacLable = spac.label;
         }
       });
       return spacLable;
       console.log()
     };
  },
};
