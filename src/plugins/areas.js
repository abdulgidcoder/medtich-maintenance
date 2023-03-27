export default {
  install: ({ config }) => {
    config.globalProperties.$nameArea = (name) => {
      let areas = [
        { value: "cairo", label: "القاهرة" },
        { value: "giza", label: "الجيزة" },
        { value: "alexandria", label: "الأسكندرية" },
        { value: "dakahlia", label: "الدقهلية" },
        { value: "red-sea", label: "البحر الأحمر" },
        { value: "beheira", label: "البحيرة" },
        { value: "fayoum", label: "الفيوم" },
        { value: "gharbiya", label: "الغربية" },
        { value: "ismailia", label: "الإسماعلية" },
        { value: "menofia", label: "المنوفية" },
        { value: "minya", label: "المنيا" },
        { value: "qaliubiya", label: "القليوبية" },
        { value: "new-valley", label: "الوادي الجديد" },
        { value: "suez", label: "السويس" },
        { value: "aswan", label: "اسوان" },
        { value: "assiut", label: "اسيوط" },
        { value: "beni-suef", label: "بني سويف" },
        { value: "port-said", label: "بورسعيد" },
        { value: "damietta", label: "دمياط" },
        { value: "sharkia", label: "الشرقية" },
        { value: "south-sinai", label: "جنوب سيناء" },
        { value: "kafr-al-sheikh", label: "كفر الشيخ" },
        { value: "matrouh", label: "مطروح" },
        { value: "luxor", label: "الأقصر" },
        { value: "qena", label: "قنا" },
        { value: "nort-sinai", label: "شمال سيناء" },
        { value: "sohag", label: "سوهاج" },
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
     };
  },
};
