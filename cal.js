var log = console.log.bind(console)

var tokenize = function(s){
  var tokens = []
  var num = ''
  for(var i=0; i<s.length; i++) {
    var e = s[i]
    if(e === ' ') {
      continue
    } else if(isSymbol(e)) {
      tokens.push(e)
    } else if(isNum(e)) {
      num += e
      if (i+1 === s.length && num != '') { // e为最后一个字符
        tokens.push(parseInt(num))
        num = ''
      }
      var next = s[i+1]
      if (!isNum(next) && num != '') {  // e的下一个字符不为数字字符
        tokens.push(parseInt(num))
        num = ''
      }
    } else {
      log('error')
      break
    }
  }
  return tokens
}

var evalExpr = function(tokens) {
  if(tokens.length == 1) {
    var token = tokens[0]
    if(isArray(token)) {
      return evalExpr(token)
    } else {
      return token
    }
  }else{
    var sign = ''
    var cutIndex = 0
    for(var i=0; i<tokens.length; i++) {
      token = tokens[i]
      if (token == '+' || token == '-') {
        sign = token
        cutIndex = i
        break
      }
      if (token == '*' || token == '/') {
        sign = token
        cutIndex = i
        continue
      }
    }

    var left = cutLeft(tokens, cutIndex)
    var right = cutRight(tokens, cutIndex)

    switch(sign) {
      case '+':
      return evalExpr(left) + evalExpr(right)
      case '-':
      return evalExpr(left) - evalExpr(right)
      case '*':
      return evalExpr(left) * evalExpr(right)
      case '/':
      return evalExpr(left) / evalExpr(right)
    }
  }
}

var cutLeft = function(tokens, cutIndex) {
  return tokens.slice(0, cutIndex)
}

var cutRight = function(tokens, cutIndex) {
  return tokens.slice(cutIndex+1, tokens.length)
}

var isNum = function(e) {
  return '.0123456789'.includes(e)
}

var isSymbol = function(e) {
  return e === '(' || e === ')' || e === '+' || e === '-' || e === '*' || e === '/'
}

var isArray = function(e) {
  return Array.isArray(e)
}

var makeTree = function(tokens) {
  var skips = 0
  var ret = {
    tree: [],
    count: 0
  }
  for(var i=0; i<tokens.length; i++) {
    var e = tokens[i]
    ret.count ++
    if(skips > 0) {
      skips --
      continue
    }
    if (e === ')') {
      return ret
    } else if( e === '(') {
      var right = cutRight(tokens, i)
      var sub = makeTree(right)
      ret.tree.push(sub.tree)
      skips = sub.count
    } else {
      ret.tree.push(e)
    }
  }
  return ret
}

var cal = function(s) {
  var tokens = tokenize(s)
  var tree = makeTree(tokens).tree
  return evalExpr(tree)
}

var __main = function() {
  res1 = cal('6 + 3 * 5 + 6 * 2 + (5 + 6)*5+8*(2 + 3*(4 + 2*4))') === (6 + 3 * 5 + 6 * 2 + (5 + 6)*5+8*(2 + 3*(4 + 2*4)))
  log(res1)
  
  res2 = cal('2 + 5 + (6 - 3) * 2') === (2 + 5 + (6 - 3) * 2)
  log(res2)
}

__main()