<script>
export default {
  props: ["data"],
};
</script>
<template>
   <!-- <Info
      mode="warning"
      msg="برجاء الدفع حتى يتم يمكنك قبول العروض "
      :show="this.$auth.role == 'customer' && !details.acf?.payment_date"
    /> -->
  <Info
    mode="info"
    msg="يتم مراجعة عملية الدفع من قبل الادارة"
    :show="
      (this.$auth.role == 'customer' &&
        data.acf?.payment_date != '' &&
        data.acf?.payment_confirm != true) ||
      (this.$auth.role == 'customer' &&
        data.acf?.report?.needs_replacement_parts &&
        data.acf?.report?.payment_date != '' &&
        data.acf?.report_payment_confirm != true)
    "
  />
</template>
