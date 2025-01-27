<template>
  <VCard class="position-relative" elevation="6" height="100%">
    <apexchart
      width="380"
      type="donut"
      :options="options"
      :series="series"
    ></apexchart>
  </VCard>
</template>

<script setup>
import { ref } from "vue";
const options = ref({
  labels: ["In Progress", "Completed", "On Hold", "Rejected"],
  colors: ["#36c5c8", "#4CAF50", "#FB8C00", "#B00020"],
  legend: {
    show: true,
    position: "bottom",
  },
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          name: {
            show: true,
            fontSize: "22px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 600,
            color: "#9DB2BF",
            offsetY: -10,
            formatter: function (val) {
              return val;
            },
          },
          value: {
            show: true,
            fontSize: "25px",
            fontWeight: 400,
            color: "#9DB2BF",
            offsetY: 16,
            formatter: function (val) {
              return val;
            },
          },
          total: {
            show: true,
            showAlways: true,
            label: "Remaining Task",
            fontSize: "15px",
            fontWeight: 200,
            color: "#9DB2BF",
            formatter: (w) => {
              return w.globals.seriesTotals[0];
            },
          },
        },
      },
    },
  },
});
const series = ref([53, 15, 5, 13]);
</script>

<style lang="scss" scoped></style>
