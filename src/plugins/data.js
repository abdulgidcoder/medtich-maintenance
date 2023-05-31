export default {
  install: ({ config }) => {
    config.globalProperties.$pollTimer = 2600;
    config.globalProperties.$cities = [
      { id: "cairo", value: "القاهرة" },
      { id: "giza", value: "الجيزة" },
      { id: "alexandria", value: "الأسكندرية" },
      { id: "dakahlia", value: "الدقهلية" },
      { id: "red-sea", value: "البحر الأحمر" },
      { id: "beheira", value: "البحيرة" },
      { id: "fayoum", value: "الفيوم" },
      { id: "gharbiya", value: "الغربية" },
      { id: "ismailia", value: "الإسماعلية" },
      { id: "menofia", value: "المنوفية" },
      { id: "minya", value: "المنيا" },
      { id: "qaliubiya", value: "القليوبية" },
      { id: "new-valley", value: "الوادي الجديد" },
      { id: "suez", value: "السويس" },
      { id: "aswan", value: "اسوان" },
      { id: "assiut", value: "اسيوط" },
      { id: "beni-suef", value: "بني سويف" },
      { id: "port-said", value: "بورسعيد" },
      { id: "damietta", value: "دمياط" },
      { id: "sharkia", value: "الشرقية" },
      { id: "south-sinai", value: "جنوب سيناء" },
      { id: "kafr-al-sheikh", value: "كفر الشيخ" },
      { id: "matrouh", value: "مطروح" },
      { id: "luxor", value: "الأقصر" },
      { id: "qena", value: "قنا" },
      { id: "nort-sinai", value: "شمال سيناء" },
      { id: "sohag", value: "سوهاج" },
    ];
    config.globalProperties.$specialization = [
      { id: "dental", value: "طب الأسنان" },
      { id: "dental-x-ray", value: "طب الأسنان والأشعة" },
      { id: "dermatology", value: "الجلدية" },
      { id: "endoscopy", value: "المناظير" },
      { id: "laboratory", value: "المختبرات" },
      { id: "ent", value: "الأنف واذن والحنجرة" },
      { id: "or", value: "or قسم العمليات" },
      { id: "physiotherapy", value: "العلاج الطبيعى" },
      { id: "radiology", value: "الأشعة" },
      { id: "sterilization-cssd", value: "قسم تعقيم" },
      { id: "sterilization-endoscopy", value: "التعقيم - المناظير" },
      { id: "sterilization-lab", value: "قسم التعقيم المختبرات" },
    ];
    config.globalProperties.$paymentGateways = [
      {
        label: "فودافون كاش",
        value: "voda_cache",
        number: "010123456789",
      },
      {
        label: "تحويل بنكى",
        value: "bank_transfer",
        number: "1001215151515",
      },
    ];
    config.globalProperties.$searchInStore = (array, val) => {
      let new_object = false;
      if (array) {
        array.find((item) => {
          if (item.id == val) {
            new_object = item.id == val ? item : false;
          }
        });
      }
      return new_object;
    };
  },
};
