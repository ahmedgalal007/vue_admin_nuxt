export default {
  methods: {
    filterColumnString(items, column, operator, value) {
      return items.filter((item) => {
        if (operator === 'equale') {
          return this.compareStringIsEquales(item[column], value)
        } else if (operator === 'not-equale') {
          return !this.compareStringIsEquales(item[column], value)
        } else if (operator === 'contains') {
          return this.compareStringIsContains(item[column], value)
        } else if (operator === 'not-contains') {
          return !this.compareStringIsContains(item[column], value)
        }
        return true
      })
    },
    filterColumnNumber(items, column, operator, value) {
      return items.filter((item) => {
        console.log(
          'Number-Filter:',
          parseFloat(item[column], 10),
          ' - ',
          parseFloat(value, 10)
        )
        if (!isNaN(value) || !isNaN(item[column])) {
          return this.compareItemIsEqualeGreaterLess(
            parseFloat(item[column], 10),
            operator,
            parseFloat(value, 10)
          )
        }
        return false
      })
    },
    filterColumnDate(items, column, operator, value) {
      return items.filter((item) =>
        this.compareItemIsEqualeGreaterLess(item[column], operator, value)
      )
    },
    filterColumnBoolean(items, column, operator, value) {
      const isTrue = (val) =>
        val === true || val === 'true' || val === '1' || val === 1
      return items.filter((item) => {
        if (operator === 'equale') {
          return isTrue(item[column]) === isTrue(value)
        } else if (operator === 'not-equale') {
          return isTrue(item[column]) !== isTrue(value)
        }
        return false
      })
    },
    compareItemIsEqualeGreaterLess(item, operator, value) {
      if (operator === 'equale') {
        return item === value
      } else if (operator === 'not-equale') {
        return item !== value
      } else if (operator === 'greater-than') {
        console.log(operator, ' - ', item, ' - ', value)
        return item > value
      } else if (operator === 'less-than') {
        return item < value
      }
      return false
    },
    compareStringIsEquales(item, value) {
      return item.toString().toLowerCase() === value.toString().toLowerCase()
    },
    compareStringIsContains(item, value) {
      return item
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase())
    },
  },
}
