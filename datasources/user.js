const { RESTDataSource } = require('apollo-datasource-rest');
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');
const axios = require("axios");
class UserService extends RESTDataSource {
  constructor() {
    super();
   // this.baseURL = 'https://sample-poc-8a5f.vercel.app/api';
   this.baseURL='http://localhost:8000';
  //this.baseURL='https://cip-1621266427-iam-sit.aipacn.com/xaas/enabler/producer/1.0.0'
  }
  // willSendRequest(_path, request) {
  //   request.headers['Authorization'] = "Bearer 477b50ac-5200-3095-a58c-385fd88e9422 ";
  // }
 
  async findUserById(userId) {
    return await this.get(`/getUserDetails?userId=${userId}`);
  }
  // async postUserId(user) {
  //   console.log(JSON.stringify(user));
  //   return this.post(
  //     `/api/postUserDetails`, // path
  //     {body:JSON.stringify(user)}, // request body
  //   );
  // }
  // async postUserId(user) {
  //   console.log("bbb");
  //   return await this.post('/api/postUserDetails',user)
  // }
  //'url':'http://localhost:8000/api/postUserDetails',
  // async postUserId(user){
  //   try {
  //     const response = await axios.post('http://localhost:8000/api/postUserDetails',user);
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  async postUserId(user){
    try {
      const response = await axios({
        'method': 'POST',
        'url':'http://localhost:8000/api/postUserDetails',
        'data':user
      })
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  
  async publishEvent(){
    try {
      console.log("inside publish event");
      const response = await axios({
        'method': 'POST',
        'url':'https://cip-1621266427-iam-sit.aipacn.com/xaas/enabler/producer/1.0.0/publish',
        'data': {"id":"e60e628b-2400-413e-b486-664a3d8bc752--11","type":"server.request","specversion":"0.2","source":"rig","contenttype":"application/json","deo":{"projectName":"commerce","event":{"eventName":"SearchEvent","eventData":{"user":"e5ea5a3e-94ed-4d6e-8399-8e5309468e50","query":"ola","channel":"web","action":"click on home search icon","refererpage":"https://beautyrepo.vercel.app/product","device_type":"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.42","sessionId":"cf0f05eb-5331-4028-809b-246b3eeeca70"}}}}
        ,
        'headers': {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ed846557-079e-30e3-ba5b-d3d854c28ac4'
      },
      })
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  // async publishEvent(event){
  //   console.log("abc");
  
  //     const response = await axios({
  //       'method': 'POST',
  //       'url':'https://cip-1621266427-iam-sit.aipacn.com/xaas/enabler/producer/1.0.0/publish',
  //       'data': event,
  //       'headers': {
  //         'Content-Type': 'application/json',
  //         'Authorization': 'Bearer 477b50ac-5200-3095-a58c-385fd88e9422'
  //     },
  //     })
    
  //   return response;
  // }
  // async postUserId(user) {
  //   return this.post('/api/postUserDetails', user)
  // }
  


  // async getProducts(){
  //   return await this.get('/getProducts');

  // }
  

}
module.exports = UserService;
