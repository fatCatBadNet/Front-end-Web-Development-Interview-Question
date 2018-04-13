import message from '../../../components/common/messagebox.vue';
import dialog from '../../../components/common/dialog.vue';
/* Vue插件 */
let ibo_plug = {};
ibo_plug.install = function(Vue, options) {
	//加载
	let optloading = {
		duration: '3000', // 持续时间
		autoclose: false //是否自动关闭
	}
	for(let property in options) {
		optloading[property] = options[property]; // 使用 options 的配置
	}
	Vue.prototype.$loading = (msg) => {
		if(document.getElementsByClassName('ibo-loading-mask').length) { // 如果loading还在，则不再执行
			return;
		}
		let msgTpl = '';
		if(msg) {
			msgTpl = '<p class="ibo-loading-text">' + msg + '</p>';
		}
		let loadingTpl = Vue.extend({ // 1、创建构造器，定义好提示信息的模板
			template: '<div class="ibo-loading-mask"><div class="ibo-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>' + msgTpl + '</div></div>'
		});
		let tpl = new loadingTpl().$mount().$el; // 2、创建实例，挂载到文档以后的地方
		document.body.appendChild(tpl);
		if(optloading.autoclose) {
			setTimeout(function() {
				document.body.removeChild(tpl);
			}, optloading.duration)
		}
	}
	Vue.prototype.$closeloading = () => {
		let dc_loading = document.getElementsByClassName('ibo-loading-mask');
		if(dc_loading.length) {
			document.body.removeChild(dc_loading[0]);
		}
	}
	//提示
	let opttoast = {
		defaultType: 'bottom', // 默认显示位置
		duration: '2000' // 持续时间
	}
	for(let property in options) {
		opttoast[property] = options[property]; // 使用 options 的配置
	}
	Vue.prototype.$toast = (tips, type) => {
			if(type) {
				opttoast.defaultType = type; // 如果有传type，位置则设为该type
			}
			if(document.getElementsByClassName('ibo-toast').length) { // 如果toast还在，则不再执行
				return;
			}
			let toastTpl = Vue.extend({ // 1、创建构造器，定义好提示信息的模板
				template: '<div class="ibo-toast ibo-toast-' + opttoast.defaultType + '"><div class="ibo-toast-message">' + tips + '</div></div>'
			});
			let tpl = new toastTpl().$mount().$el; // 2、创建实例，挂载到文档以后的地方
			document.body.appendChild(tpl);
			setTimeout(function() {
				document.body.removeChild(tpl);
			}, opttoast.duration)
		}
		['bottom', 'center', 'top'].forEach(type => { //底部、居中、顶部
			Vue.prototype.$toast[type] = (tips) => {
				return Vue.prototype.$toast(tips, type)
			}
		})
    //消息提示
	Vue.prototype.$message = (options) => {
		options = options || {};
		let MessageConstructor = Vue.extend(message);
		let instance = new MessageConstructor();
		instance.vm = instance.$mount();
		instance.vm.visible = true;
		instance.vm.removeparent = true;
		instance.vm.title = options.title ? options.title : "提示";
		instance.vm.content = options.content ? options.content : "";
		instance.vm.objbutton = options.objbutton;
		document.body.appendChild(instance.vm.$el);
	}
	//对话框提示
	Vue.prototype.$dialog = (options) => {
		options = options || {};
		let DialogConstructor = Vue.extend(dialog);
		let instance = new DialogConstructor();
		instance.vm = instance.$mount();
		instance.vm.visible = true;
		instance.vm.removeparent = true;
		instance.vm.title = options.title ? options.title : "提示";
		instance.vm.content = options.content ? options.content : "";
		instance.vm.objbutton = options.objbutton;
		document.body.appendChild(instance.vm.$el);
	}
}
export default ibo_plug;