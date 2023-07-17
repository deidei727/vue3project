export function debounce(callback:()=>void, delay:number) {
	let timerId:NodeJS.Timeout|null
	return function () {
		// 如果上次事件还没有真正处理, 清除
		if (timerId) {
			clearTimeout(timerId)
		}

		// 发事件发生指定事件后才调用处理事件的回调函数
		// 启动定时器, 只是准备真正处理
		timerId = setTimeout(() => {
			// 正在处理事件
			callback.call(null)
			// 删除准备处理的标记
			timerId = null
		}, delay)
	}
}

