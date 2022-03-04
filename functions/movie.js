//[ node.js 동작환경 ]

//aixos를 받아온다.
const axios = require('axios')
// OMDB API 키 -> .env 파일에 환경변수로 선언됬다.
const OMDB_API_KEY = process.env.OMDB_API_KEY

exports.handler = async function(event){
  //event.body를 네트워크 통신을 통해 받을때 문자 데이터로 받기때문에 이를 객체형식으로 변환해야 한다 -> JSON.parse()
  const payload = JSON.parse(event.body)

  // payload 구조분해
  // search 컴포넌트의 aply()매서드를 통해 전달받은 데이터가 내부로 들어간다.
  const {title, type, year, page, id} = payload
  // url주소는 삼항연산자 를 통해 id 값이 있는 경우 와 없는 경우로 나눠 넣는다. 삼항연산자  ======>   (조건 ? 참일때실행 : 거짓일때실행)
  const url = id 
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` //id값이 있을때
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}` //id값이 없을때
  //const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}`

  try{
    const res = await axios.get(url)
    if(res.data.Error){
      return{
        statusCode: 400,
        body: res.data.Error
      }
    } else {
      return{
        statusCode:200,
        body: JSON.stringify(res.data)
      }
    }
  }catch(error){
    return{
      statusCode: error.response.status,
      body: error.message
    }
  }


  // return new Promise((resolve, reject)=>{
  //   axios.get(url)
  //     .then( res => {
  //       if(res.data.Error){
  //         reject(res.data.Error)
  //       }
  //       resolve(res)
  //     })
  //     .catch( err =>{
  //       reject(err.message)
  //     })
  // })
}