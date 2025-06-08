<script setup lang="ts">
import { VbenAvatar } from '../avatar';

interface Props {
  /**
   * @zh_CN 是否收起文本
   */
  collapsed?: boolean;
  /**
   * @zh_CN Logo 跳转地址
   */
  href?: string;
  /**
   * @zh_CN Logo 图片大小
   */
  logoSize?: number;
  /**
   * @zh_CN Logo 图标
   */
  src?: string;
  /**
   * @zh_CN Logo 文本
   */
  text: string;
  /**
   * @zh_CN Logo 主题
   */
  theme?: string;
  /**
   * @logo 是否长宽一致
   * width 只有宽度，height 只有高度， 未设置，保持长宽一致
   */
  whBase?: string;
}

defineOptions({
  name: 'VbenLogo',
});

withDefaults(defineProps<Props>(), {
  collapsed: false,
  href: 'javascript:void 0',
  logoSize: 20,
  src: '',
  theme: 'light',
  whBase: 'height',
});
</script>

<template>
  <div :class="theme" class="flex h-full items-center text-lg">
    <a
      :class="$attrs.class"
      :href="href"
      class="flex h-full items-center gap-2 overflow-hidden px-3 text-lg leading-normal transition-all duration-500"
    >
      <VbenAvatar
        v-if="src"
        :alt="text"
        :src="src"
        :size="logoSize"
        :wh-base="whBase"
        class="relative rounded-none bg-transparent"
      />
      <span
        v-if="!collapsed"
        class="text-foreground truncate text-nowrap font-semibold"
        :title="text"
      >
        {{ text }}
      </span>
    </a>
  </div>
</template>
