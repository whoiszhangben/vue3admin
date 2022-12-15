import { watch, unref } from 'vue';
import { useTitle as usePageTitle } from '@vueuse/core';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n'


/**
 * Listening to page changes and dynamically changing site titles
 */
export function useTitle() {
  const { currentRoute } = useRouter();

  const pageTitle = usePageTitle();
  const { t } = useI18n()

  watch(
    [() => currentRoute.value.path],
    () => {
      const route = unref(currentRoute);

      const tTitle = route?.meta?.title as string;

      if (tTitle) {
        pageTitle.value = t(tTitle);
      }
    },
    { immediate: true },
  );
}
