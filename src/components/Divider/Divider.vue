<template>
    <div class="divider-wrapper">
        <hr class="divider" v-if='!props.vertical' :class="[styles]" :style="props.color ? `--divider-clr: ${props.color}` : undefined" />
        <div class="divider vertical" v-if='props.vertical' :class="[styles]" :style="props.color ? `--divider-clr: ${props.color}` : undefined"></div>
        <span class="divider-content" v-if='props.content' :class="props.alignContent">{{ props.content }}</span>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
const props = defineProps<{
    color?: string
    vertical?: boolean
    type?: string
    content?: string
    alignContent?: string
    noMargin?: boolean
}>()
const styles = ref({
    dashed: props.type === 'dashed',
    dotted: props.type === 'dotted',
    solid: props.type === 'solid',
    'no-margin': props.noMargin
})
</script>

<style lang='scss'>
@import './divider'
</style>