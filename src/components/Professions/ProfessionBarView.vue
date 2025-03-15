<script setup>
import { ref, onMounted, defineProps } from "vue";

const props = defineProps({
  profession: Object
});

</script>

<template>
  <div class="profession-info">
    <span class="profession-name">{{ profession.profession_name }}</span>
    <span class="salary">${{ profession.current_salary.toLocaleString() }}</span>
  </div>
</template>

<style scoped>
.profession-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: #f8f9fa;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  border: 1px solid #ddd;
}

.profession-name {
  color: #333;
}

.salary {
  color: #4caf50;
}
</style>
