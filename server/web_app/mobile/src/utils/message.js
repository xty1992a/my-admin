export default class Messager {
  constructor(win, targetOrigin) {
	this.win = win;
	this.targetOrigin = targetOrigin;
	this.actions = {};
	window.addEventListener('message', this.handleMessageListener, false);
  }

  handleMessageListener = (event) => {
	// 我们能相信信息的发送者吗?  (也许这个发送者和我们最初打开的不是同一个页面).
	if (event.origin !== this.targetOrigin) {
	  console.warn(`${event.origin}不对应源${this.targetOrigin}`);
	  return;
	}
	if (!event.data || !event.data.type) {
	  return;
	}
	const { type } = event.data;
	if (!this.actions[type]) {
	  console.warn(`${type}: missing listener`);
	  return;
	}
	this.actions[type](event.data.value);
  };

  on = (type, cb) => {
	this.actions[type] = cb;
	return this;
  };

  emit = (type, value) => {
	this.win.postMessage({
	  type, value,
	}, this.targetOrigin);
	return this;
  };

  destroy() {
	window.removeEventListener('message', this.handleMessageListener);
  }
}
