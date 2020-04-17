function init () {
  function typeLoop() {
    textUtils.typeText('BiliBili!')
      .then(() => utils.wait(2000))
      .then(() => textUtils.removeText(9))
      .then(() => textUtils.typeText('World!'))
      .then(() => utils.wait(2000))
      .then(() => textUtils.removeText(6))
      .then(typeLoop)
  }
  utils.wait(1000).then(() => {
    textUtils.clearText()
    textUtils.typeText('Hello, ').then(typeLoop)
  })
}

const textNode = document.getElementById('type-text')
let text = ''

const utils = {
  genRandomInterval: () => {
    const randomMsInterval = 100 * Math.random()
    const msInterval = randomMsInterval < 50 ? 10 : randomMsInterval
    return msInterval
  },
  wait: (time) => {
    return new Promise(resolve => {
      setTimeout(resolve, time)
    })
  }
}

const characterUtils = {
  pushCharacter: (character) => {
    text += character
    textUtils.updateText()
  },
  popCharacter: () => {
    text = text.slice(0, text.length -1)
    textUtils.updateText()
  },
  typeCharacter: (character) => {
    return new Promise(resolve => {
      const msInterval = utils.genRandomInterval()
      characterUtils.pushCharacter(character)
      utils.wait(msInterval).then(resolve)
    })
  },
  removeCharacter: () => {
    return new Promise(resolve => {
      const msInterval = utils.genRandomInterval()
      characterUtils.popCharacter()
      utils.wait(msInterval).then(resolve)
    })
  }
}

const textUtils = {
  updateText: () => {
    textNode.innerText = text
  },
  clearText: () => {
    text = ''
    textUtils.updateText()
  },
  typeText: (text) => {
    return new Promise(resolve => {
      (function _type (index) {
        characterUtils.typeCharacter(text[index]).then(() => {
          if (index + 1 < text.length) {
            _type(index + 1)
          } else {
            resolve()
          }
        })
      })(0)
    })
  },
  removeText: (amount) => {
    return new Promise(resolve => {
      (function _remove (index) {
        characterUtils.removeCharacter().then(() => {
          if (index + 1 < amount) {
            _remove(index + 1)
          } else {
            resolve()
          }
        })
      })(0)
    })
  }
}

init()
