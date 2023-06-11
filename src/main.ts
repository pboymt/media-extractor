import { createApp } from 'vue';
import './style.scss';
import App from './App.vue';
import WeiboPlugin from './plugins/weibo';

const app = createApp(App);
app.use(WeiboPlugin);

app.mount(
  (() => {
    const div = document.createElement('div');
    div.setAttribute('id', 'vite-plugin-monkey-app');
    document.body.append(div);
    return div;
  })(),
);
