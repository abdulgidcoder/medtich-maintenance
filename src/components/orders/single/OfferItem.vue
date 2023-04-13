<script>
export default {
  props: {
    offer: {},
    acceptTech: '',
  },
  data() {
    return { accepted: this.offer.technical["ID"] == this.acceptTech };
  },
  setup() {},
};
</script>
<template>
  <li :class="{ accepted: accepted }">
    <div class="offer_top">
      <div class="offer_right">
        <div class="app-avatar" v-html="offer.technical.user_avatar"></div>
        <div class="offer-info">
          <h4>{{ offer.technical.display_name }}</h4>
          <div class="offer-meta">
            <span class="offer-date">{{ $dateTime(offer.date) }}</span
            ><strong class="offer-price">{{ offer.price + " جنية" }}</strong>
          </div>
        </div>
      </div>
      <div class="offer_left">
        <button class="btn btn-primary btn-sm" v-if="false">قبول</button>
        <button class="btn btn-primary btn-sm" v-if="false">قبول</button>
        <span class="app-badge completed" v-if="accepted">تم قبول العرض</span>
      </div>
    </div>
    <div class="offer_bottom">
      <p class="offer-details">{{ offer.details }}</p>
    </div>
  </li>
</template>
