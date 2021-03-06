module.exports = {
  env:{
    //코드 검사를 브라우저, node.js, jset.js 에서 진행
    browser:true,
    node:true,
    jest: true
  },
  extends: [
    //코드검사를 진행할 규칙

    //[== vue ==]
    // 'plugin:vue/vue3-essential', //Lv1
    'plugin:vue/vue3-strongly-recommended', // Lv2
    // 'plugin:vue/vue3-recommended', // Lv3

    //[== js ==]
    'eslint:recommended'
    
  ],
  parserOptions:{
    //코드를 분석할수 있는 분석기를 지정
    "parser": "@babel/eslint-parser",
    "requireConfigFile": false,
  },
  rules:{
    //extends에서 제공하는 규칙 이외의 조정을 하고싶을때
    "vue/html-closing-bracket-newline" : ["error",{
      "singleline":"never",
      "multiline":"never"
    }],
    "vue/html-self-closing":["error",{
      "html":{
        "void":"always",
        "normal":"never",
        "component":"always"
      },
      "svg":"always",
      "math":"always"
    }],
    //vue 이름 여러줄 룰 무시
    "vue/multi-word-component-names": ["error", {
      "ignores": [
        "Home",
        "About",
        "Movie",
        "Header",
        "Logo",
        "Headline",
        "Search",
        "Footer",
        "Loader",
        "Child",
        "Parent"
      ]
    }]
  }
}