# calculator
百行代码实现支持括号运算的计算器。


#### 词法分析


将字符序列转换为单词（token）序列的过程。也就是将字符串分割为一个一个的独立小单元。

```
>> tokenize('11+2+3')
  [11, "+", 2, "+", 3]

>> tokenize('333/44+(22+3)')
  [333, "/", 44, "+", "(", 22, "+", 3, ")"]
```


词法分析的实现， 基本思想就是根据字符的属性进行分发处理

```
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

var cutLeft = function(tokens, cutIndex) {
  var n = cutIndex
  return tokens.slice(0, n)
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

```
