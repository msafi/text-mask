import packageJson from '../package.json'
import isVerify from '../../common/isVerify.js'
import dynamicTests from 'mocha-dynamic-tests'
import chai from 'chai'
import testParameters, {unguidedMode} from './../../common/testParameters.js'

const conformToMask = (isVerify()) ?
  require(`../${packageJson.main}`).conformToMask :
  require('../src/conformToMask.js').default

const expect = chai.expect

describe.only('conformToMask', () => {
  dynamicTests(
    unguidedMode,

    (test) => ({
      description: `for input ${JSON.stringify(test.input)}, ` +
      `it outputs '${test.output.conformedInputFieldValue}'`,

      body: () => {
        expect(conformToMask(
          test.input.userModifiedInputFieldValue,
          test.input.mask,
          {guide: false, previousUserInput: test.input.startingInputFieldValue}
        ).output).to.equal(test.output.conformedInputFieldValue)
      }
    })
  )

  dynamicTests(
    testParameters,

    (test) => ({
      description: `for input ${JSON.stringify(test.input)}, ` +
      `it outputs '${test.output.conformedInputFieldValue}'`,

      body: () => {
        expect(conformToMask(
          test.input.userModifiedInputFieldValue,
          test.input.mask
        ).output).to.equal(test.output.conformedInputFieldValue)
      }
    })
  )
})
