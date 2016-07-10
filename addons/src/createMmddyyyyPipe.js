export default function createMmddyyyyPipe() {
  return function({
    valueToConform,
    mask,
    conformToMask,
    conformToMaskConfig,
    currentCaretPosition,
    placeholderChar,
    retainCharsPositions
  }) {
    const {previousConformedInput, placeholder} = conformToMaskConfig

    valueToConform = retainCharsPositions({
      valueToConform,
      placeholder,
      currentCaretPosition,
      placeholderChar,
      previousConformedInput
    })

    const conformedUserInput = conformToMask(valueToConform, mask, conformToMaskConfig)
    const indexesOfAddedCharacters = []

    const month1stDigit = parseDigit(conformedUserInput[0])
    const month2ndDigit = parseDigit(conformedUserInput[1])
    const day1stDigit = parseDigit(conformedUserInput[3])
    const day2ndDigit = parseDigit(conformedUserInput[4])
    const year1stDigit = parseDigit(conformedUserInput[6])
    const year2ndDigit = parseDigit(conformedUserInput[7])
    const year3rdDigit = parseDigit(conformedUserInput[8])
    const year4thDigit = parseDigit(conformedUserInput[9])

    const conformedUserInputArr = conformedUserInput.split('')

    if (month1stDigit > 1) {
      conformedUserInputArr.splice(0, 2, 0, month1stDigit)

      indexesOfAddedCharacters.push(0)
    }

    if (
      (month1stDigit === 1 && month2ndDigit > 2) ||
      (month1stDigit === 0 && month2ndDigit === 0)
    ) {
      return {conformedInput: previousConformedInput}
    }

    if (day1stDigit > 3) {
      conformedUserInputArr.splice(3, 2, 0, day1stDigit)

      indexesOfAddedCharacters.push(3)
    }

    if (
      (day1stDigit === 3 && day2ndDigit > 1) ||
      (day1stDigit === 0 && day2ndDigit === 0)
    ) {
      return {conformedInput: previousConformedInput}
    }

    if (year1stDigit > 2 || year1stDigit === 0) {
      conformedUserInputArr.splice(6, 3, 2, 0, year1stDigit)

      indexesOfAddedCharacters.push(6, 7)
    }

    return {
      conformedInput: conformedUserInputArr.join(''),
      indexesOfAddedCharacters
    }
  }
}

// const numberOfDaysInEachMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
//
// export default function createMmddyyyyPipe(
//   {minimumDate = '', maximumDate = ''} = {}
// ) {
//   return function(conformedUserInput) {
//     const month1stDigit = parseDigit(conformedUserInput[0])
//     const month2ndDigit = parseDigit(conformedUserInput[1])
//     const day1stDigit = parseDigit(conformedUserInput[3])
//     const day2ndDigit = parseDigit(conformedUserInput[4])
//     const year1stDigit = parseDigit(conformedUserInput[6])
//     const year2ndDigit = parseDigit(conformedUserInput[7])
//     const year3rdDigit = parseDigit(conformedUserInput[8])
//     const year4thDigit = parseDigit(conformedUserInput[9])
//
//     const last4DigitsOfMinimumDate = minimumDate.substr(6, 4)
//     const last4DigitsOfMaximumDate = maximumDate.substr(6, 4)
//
//     const minimumYear = (last4DigitsOfMinimumDate.length === 4) ?
//       Number(last4DigitsOfMinimumDate) :
//       -Infinity
//     const maximumYear = (last4DigitsOfMaximumDate.length === 4) ?
//       Number(last4DigitsOfMaximumDate) :
//       Infinity
//
//     const month = (
//       month1stDigit !== false &&
//       month2ndDigit !== false &&
//       combineDigits([month1stDigit, month2ndDigit])
//     )
//     const day = (
//       day1stDigit !== false &&
//       day2ndDigit !== false &&
//       combineDigits([day1stDigit, day2ndDigit])
//     )
//     const year = (
//       year1stDigit !== false &&
//       year2ndDigit !== false &&
//       year3rdDigit !== false &&
//       year4thDigit !== false &&
//       combineDigits([year1stDigit, year2ndDigit, year3rdDigit, year4thDigit])
//     )
//
//     const digitsOrder = [
//       month1stDigit,
//       month2ndDigit,
//       day1stDigit,
//       day2ndDigit,
//       year1stDigit,
//       year2ndDigit,
//       year3rdDigit,
//       year4thDigit
//     ]
//
//     let sawUnfilledDigit = false
//     for (let i = 0; i < digitsOrder.length; i++) {
//       const digit = digitsOrder[i]
//
//       if (digit === false) {
//         sawUnfilledDigit = true
//       }
//
//       if (digit !== false && sawUnfilledDigit === true) {
//         return false
//       }
//     }
//
//     if (month1stDigit > 1) {
//       return false
//     }
//
//     if (month !== false) {
//       if (month < 1 || month > 12) {
//         return false
//       }
//     }
//
//     if (day1stDigit !== false) {
//       const monthLength = numberOfDaysInEachMonth[month - 1]
//
//       if (day1stDigit > getDigit(monthLength, 0)) {
//         return false
//       }
//     }
//
//     if (day !== false) {
//       const monthLength = numberOfDaysInEachMonth[month - 1]
//
//       if (day < 1 || day > 31 || day > monthLength) {
//         return false
//       }
//     }
//
//     if (year1stDigit !== false) {
//       if (
//         year1stDigit < getDigit(minimumYear, 0) ||
//         year1stDigit > getDigit(maximumYear, 0)
//       ) {
//         return false
//       }
//     }
//
//     if (year2ndDigit !== false) {
//       const yearDigits = [year1stDigit, year2ndDigit]
//
//       if (
//         combineDigits(yearDigits) < getDigits(minimumYear, [0, 1]) ||
//         combineDigits(yearDigits) > getDigits(maximumYear, [0, 1])
//       ) {
//         return false
//       }
//     }
//
//     if (year3rdDigit !== false) {
//       const yearDigits = [year1stDigit, year2ndDigit, year3rdDigit]
//
//       if (
//         combineDigits(yearDigits) < getDigits(minimumYear, [0, 1, 2]) ||
//         combineDigits(yearDigits) > getDigits(maximumYear, [0, 1, 2])
//       ) {
//         return false
//       }
//     }
//
//     if (year !== false) {
//       const isLeapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)
//
//       if (isLeapYear === false && month === 2 && day > 28) {
//         return false
//       }
//
//       if (year < minimumYear || year > maximumYear) {
//         return false
//       }
//     }
//
//     // Verify that full date is smaller than `maximumDate` and bigger than `minimumDate`
//     if (conformedUserInput.length > 9) {
//       const userInputDateObj = new Date(conformedUserInput)
//
//       if (maximumDate.length === 10) {
//         const maximumDateObj = new Date(maximumDate)
//
//         if (userInputDateObj > maximumDateObj) {
//           return false
//         }
//       }
//
//       if (minimumDate.length === 10) {
//         const minimumDateObj = new Date(minimumDate)
//
//         if (userInputDateObj < minimumDateObj) {
//           return false
//         }
//       }
//     }
//
//     return true
//   }
// }
//
const digitsNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const digitsStrings = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const allDigits = digitsNumbers.concat(digitsStrings)
function parseDigit(value) {
  const digit = allDigits.find((digit) => {
    return digit === value
  })

  if (digit === undefined) {
    return value
  } else {
    return Number(digit)
  }
}
//
// function combineDigits(digits) {
//   return Number(digits.reduce((combinedDigits, digit) => {
//     combinedDigits += digit
//
//     return combinedDigits
//   }, ''))
// }
//
// function getDigit(number, index) {
//   return String(number)[index]
// }
//
// function getDigits(number, digits) {
//   return combineDigits(digits.map((digit) => getDigit(number, digit)))
// }
