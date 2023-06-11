import { GM } from '$';
import { Plugin, ref } from 'vue';

export class Weibo {

    readonly API_WEIBO_GOURP_TIMELINE = 'https://weibo.com/ajax/feed/groupstimeline';

    private currentPath = location.pathname;

    constructor() {
        this.bind();
    }

    bind() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (this.currentPath !== location.pathname) {
                    this.currentPath = location.pathname;
                    this.pageType.value = this._pageType();
                }
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    readonly pageType = ref(this._pageType());

    _pageType() {
        console.log('pageType', this.currentPath);
        switch (true) {
            case /^\/\d+/i.test(this.currentPath):
            case /^\/status/i.test(this.currentPath):
                return 'status';
            case /^\/mygroups/.test(this.currentPath):
                return 'mygroups';
            case /^\/u\//.test(this.currentPath):
                return 'home';
            case /^\//.test(this.currentPath):
                return 'home';
            default:
                return 'unknown';
        }
    }

}

declare module 'vue' {
    interface ComponentCustomProperties {
        $weibo: Weibo;
    }
}

export default {
    install(app, ...options) {
        const weibo = new Weibo();
        app.config.globalProperties.$weibo = weibo;
        app.provide('weibo', weibo);
    },
} satisfies Plugin;