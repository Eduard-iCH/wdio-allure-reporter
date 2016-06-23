'use strict'

let expect = require('chai').expect
let helper = require('../helper')

describe('after hooks', () => {
    beforeEach(helper.clean)

    it('should not appear in results when it is passing', () => {
        return helper.run(['after-all-passing']).then((results) => {
            const result = results[0]
            expect(result('test-case')).to.have.lengthOf(1)
            expect(result('test-case > name').text()).to.equal('with passing test')
            expect(result('test-case').attr('status')).to.equal('passed')
        })
    })

    it('should report failed after-all hook', () => {
        return helper.run(['after-all-failing']).then((results) => {
            expect(results).to.have.lengthOf(1)

            const result = results[0]
            expect(result('test-case')).to.have.lengthOf(2)

            const test = result('test-case').eq(0)
            expect(test.children('name').text()).to.equal('with passing test')
            expect(test.attr('status')).to.equal('passed')

            const hook = result('test-case').eq(1)
            expect(hook.children('name').text()).to.equal('"after all" hook')
            expect(hook.attr('status')).to.equal('failed')
        })
    })

    it('should report after-each hook', () => {
        return helper.run(['after-each-failing']).then((results) => {
            expect(results).to.have.lengthOf(1)

            const result = results[0]
            expect(result('test-case')).to.have.lengthOf(1)
            expect(result('test-case > name').text()).to.equal('"after each" hook for "with passing test"')
            expect(result('test-case').attr('status')).to.equal('broken')
        })
    })
})