<script>
import AddOffer from "./AddOffer.vue";
import OfferItem from "./OfferItem.vue";
export default {
  components: { AddOffer, OfferItem },
  props: ["data", "isMyOrder"],
  data() {
    return {
      allowAddOffer: null,
    };
  },
  watch: {
    data() {
      this.acceptedOffer(this.data.acf?.offers);
    },
  },
  created() {
    this.acceptedOffer(this.data.acf?.offers);
  },
  methods: {
    acceptedOffer(offers) {
      if (offers) {
        this.allowAddOffer = offers.some(
          (item) => item.technical["ID"] === this.$auth.user_data.id
        );
      } else {
        this.allowAddOffer = true;
      }
    },
  },
};
</script>
<template>
  <Card>
    <template #title>العروض</template>
    <template #actions>
      <AddOffer
        v-if="!allowAddOffer && !isMyOrder && this.$auth.role == 'technician'"
        :orderID="data.id"
      />
    </template>
    <template #body>
      <EmptyContent
        title="لا يوجد اى عروض"
        :iconsSize="100"
        v-if="!data.acf?.offers"
      />
      <ul class="order-offers" v-if="data.acf?.offers">
        <OfferItem
          v-for="(offer, index) in data.acf?.offers"
          :key="index"
          :offer="offer"
          :acceptTech="data.acf?.technician?.ID"
          :order="data"
        />
      </ul>
    </template>
  </Card>
</template>
