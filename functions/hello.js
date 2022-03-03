exports.handler = async function(event, context){
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'DongGyun',
      age: 85,
      email: 'seadonggyun@gmail.com'
    })
  }
}