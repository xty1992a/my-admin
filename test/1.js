const justjavac = createIterator([`j`, `u`, `s`, `t`, `j`, `a`, `v`, `a`, `c`])

function createIterator(items) {
  return {
	[Symbol.iterator]: () => {
	  return {
		next: () => ({
		  done: items.length === 0,
		  value: items.shift(),
		}),
	  }
	},
  }

}

for (const item of justjavac) {
  console.log(item)
}
