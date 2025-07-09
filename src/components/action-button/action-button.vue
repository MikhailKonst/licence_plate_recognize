<script setup lang="ts">
// import { ref } from 'vue';
// import { useGrzStore } from '@/stores/grzStore';

// const store = useGrzStore();
// const fileInput = ref<HTMLInputElement | null>(null);

// const handleFileChange = async (e: Event) => {
// 	const file = (e.target as HTMLInputElement).files?.[0];
// 	if (!file) return;

// 	const reader = new FileReader();
// 	reader.onload = () => {
// 		const base64 = (reader.result as string).split(',')[1];
// 		// store.setImage(base64);
// 	};
// 	reader.readAsDataURL(file);
// };
</script>

<template>
	<!-- <div>
		<input ref="fileInput" type="file" accept="image/*" @change="handleFileChange" />
	</div> -->
</template>

<style lang="scss" scoped></style>
