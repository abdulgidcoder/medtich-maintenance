<script>
export default {
  props: ["payment_gateway"],
};
</script>
<template>
  <div class="payment-gateway-info" v-if="payment_gateway">
    <div v-for="pay in this.$paymentGateways" :key="pay.value">
      <Transition name="fade">
        <template v-if="payment_gateway == pay.value">
          <ul>
            <li><strong>اسم الحساب: </strong>{{ pay.account_name }}</li>
            <li><strong>رقم الحساب: </strong>{{ pay.account_number }}</li>
            <li><strong>IBAN: </strong>{{ pay.account_iban }}</li>
            <li><strong>Swift Code: </strong>{{ pay.swift_code }}</li>
          </ul>
        </template>
      </Transition>
    </div>
  </div>
</template>
