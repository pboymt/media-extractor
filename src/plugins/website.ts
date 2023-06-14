export enum Website {
    Weibo = '新浪微博', // 微博
    Bilibili = '哔哩哔哩', // 哔哩哔哩
    Xinhuanet = '新华网', // 新华网
    Unknown = '未知网站', // 未知
}

export const WebsiteList = {
    'weibo.com': Website.Weibo,
    'bilibili.com': Website.Bilibili,
    'xinhuanet.com': Website.Xinhuanet,
}

export function checkWebsite() {
    const hostname = location.hostname;
    for (const [key, value] of Object.entries(WebsiteList)) {
        if (hostname.endsWith(key)) {
            return value;
        }
    }
    return Website.Unknown;
}