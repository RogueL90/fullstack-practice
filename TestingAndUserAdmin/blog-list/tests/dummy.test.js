const test = require('node:test')
const assert = require('node:assert')
const dummy = require('../utils/list_helpers').dummy

test('dummy returns 1', () => {
    const blog = []
    const result = dummy(blog)
    assert.strictEqual(result, 1)
})
