import axios from 'axios';



axios.interceptors.request.use(
   (req) => {
      // console.info("req ====> ", req.url, req)
      return req;
   },
   (err) => {
      return Promise.reject(err);
   }
);

axios.interceptors.response.use(
   (res) => {
      if (res.status === 201) {
         console.log('Posted Successfully');
      }
      // console.info("res ====> ", res?.config?.url, res)
      return res;
   },
   (err) => {
      return Promise.reject(err);
   }
);