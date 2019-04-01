import {createEventHub} from './events'

const hub = createEventHub()

const listenWheel = (el, callback) => {
  if (document.addEventListener) {
	el.addEventListener('mousewheel', callback);
	el.addEventListener('wheel', callback);
	el.addEventListener('DOMMouseScroll', callback);
  }
  else {
	el.attachEvent('onmousewheel', callback); //IE 6/7/8
  }
};

const removeWheel = (el, callback) => {
  if (el.addEventListener) {
	el.removeEventListener('mousewheel', callback);
	el.removeEventListener('wheel', callback);
	el.removeEventListener('DOMMouseScroll', callback);
  }
  else {
	el.detachEvent('onmousewheel', callback);
  }
};

const scroll = e => {

}

const mouseWheel = e => {
  let value = e.wheelDelta || -e.deltaY || -e.detail,
	  delta = Math.max(-1, Math.min(1, value));
  hub.emit('wheel', delta < 0);
}

window.removeEventListener('scroll', this.scroll);
window.addEventListener('scroll', this.scroll);

removeWheel(window, mouseWheel)
listenWheel(window, mouseWheel)

export default hub
