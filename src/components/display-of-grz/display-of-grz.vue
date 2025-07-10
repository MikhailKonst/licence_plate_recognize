<!-- <script setup lang="ts">
import { ref } from 'vue';
// import { useGrzStore } from '@/stores/grzStore';

// const store = useGrzStore();
const fileInput = ref<HTMLInputElement | null>(null);

const handleFileChange = async (e: Event) => {
	const file = (e.target as HTMLInputElement).files?.[0];
	if (!file) return;

	const reader = new FileReader();
	reader.onload = () => {
		const base64 = (reader.result as string).split(',')[1];
		// store.setImage(base64);
	};
	reader.readAsDataURL(file);
};
</script>

<template>
	<div>
		<input ref="fileInput" type="file" accept="image/*" @change="handleFileChange" />
	</div>
</template>

<style lang="scss" scoped></style> -->

<script setup lang="ts">
import { ref } from 'vue';

const fileInput = ref<HTMLInputElement | null>(null);
const imageSrc = ref<string | null>(null);

const handleFileChange = async (e: Event) => {
	const file = (e.target as HTMLInputElement).files?.[0];
	if (!file) return;

	const reader = new FileReader();
	reader.onload = () => {
		imageSrc.value = reader.result as string;
	};
	reader.readAsDataURL(file);
};
</script>

<template>
	<div class="upload-container">
		<!-- Показываем изображение, если оно загружено -->
		<img v-if="imageSrc" :src="imageSrc" alt="Загруженное изображение" class="preview-image" />

		<!-- Иначе показываем input -->
		<input
			v-else
			ref="fileInput"
			type="file"
			accept="image/*"
			@change="handleFileChange"
			class="upload-input"
		/>
	</div>
</template>

<style lang="scss" scoped>
.upload-container {
	width: 300px;
	height: 300px;
	position: relative;
	border: 2px dashed #ccc;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
}

.upload-input {
	width: 100%;
	height: 100%;
	cursor: pointer;
	opacity: 0;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 1;
}

.upload-container::before {
	content: 'Выберите изображение';
	position: absolute;
	color: #888;
	font-size: 14px;
	text-align: center;
	pointer-events: none;
	z-index: 0;
}

.preview-image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
