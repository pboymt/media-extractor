import { GM } from '$';
import { Plugin, ref } from 'vue';

export enum WeiboPageType {
    Status = '微博详情',
    Group = '分组微博',
    Home = '主页微博',
    User = '用户主页',
}

export class WeiboPlugin {

    readonly API_WEIBO_GOURP_TIMELINE = 'https://weibo.com/ajax/feed/groupstimeline';

    readonly PAGE_TYPE_STATUS = /^https:\/\/weibo\.com\/(?<uid>\d+)\/(?<mid>[0-9A-z])/;
    readonly PAGE_TYPE_GROUP = /^https:\/\/weibo\.com\/y/;

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
            case this.PAGE_TYPE_STATUS.test(this.currentPath):
                return WeiboPageType.Status;
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
        $weibo: WeiboPlugin;
    }
}

export default {
    install(app, ...options) {
        const weibo = new WeiboPlugin();
        app.config.globalProperties.$weibo = weibo;
        app.provide('weibo', weibo);
    },
} satisfies Plugin;