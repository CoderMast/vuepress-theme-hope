import { computed, defineComponent, h } from "vue";
import { usePageFrontmatter } from "@vuepress/client";

import { iconMap } from "./config";

import { useThemeLocaleData, usePure } from "@theme-hope/composables";

import type { VNode } from "vue";
import type {
  HopeThemeNormalPageFrontmatter,
  MediaType,
} from "../../../shared";

const medias: MediaType[] = [
  "Baidu",
  "Bitbucket",
  "Dingding",
  "Discord",
  "Dribbble",
  "Email",
  "Evernote",
  "Facebook",
  "Flipboard",
  "Gitee",
  "GitHub",
  "Gitlab",
  "Gmail",
  "Instagram",
  "Lines",
  "Linkedin",
  "Pinterest",
  "Pocket",
  "QQ",
  "Qzone",
  "Reddit",
  "Rss",
  "Steam",
  "Twitter",
  "Wechat",
  "Weibo",
  "Whatsapp",
  "Youtube",
  "Zhihu",
];

interface MediaLink {
  icon: MediaType;
  url: string;
}

import "../../styles/media-links.scss";

export default defineComponent({
  name: "MediaLinks",

  setup() {
    const frontmatter = usePageFrontmatter<HopeThemeNormalPageFrontmatter>();
    const themeLocale = useThemeLocaleData();
    const isPure = usePure();

    const mediaLinks = computed(() => {
      const { medialinks } = frontmatter.value;

      const config =
        medialinks === false
          ? false
          : typeof medialinks === "object"
          ? medialinks
          : themeLocale.value.blog
          ? themeLocale.value.blog?.links || false
          : false;

      if (config) {
        const links: MediaLink[] = [];

        for (const media in config) {
          const url = config[media as MediaType];

          if (medias.includes(media as MediaType) && url)
            links.push({ icon: media as MediaType, url });
        }

        return links;
      }

      return [];
    });

    return (): VNode | null =>
      mediaLinks.value.length
        ? h(
            "div",
            { class: "media-links-wrapper" },
            mediaLinks.value.map((mediaLink) =>
              h(
                "a",
                {
                  class: "media-link",
                  href: mediaLink.url,
                  rel: "noopener noreferrer",
                  target: "_blank",
                  ariaLabel: mediaLink.icon,
                  ...(isPure.value ? { "data-balloon-pos": "up" } : {}),
                },
                [
                  h("span", { class: "sr-only" }, mediaLink.icon),
                  h(iconMap[mediaLink.icon]),
                ]
              )
            )
          )
        : null;
  },
});
