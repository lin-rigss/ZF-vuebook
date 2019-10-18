import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000';

axios.interceptors.response.use(
    res =>{    
       return res.data     
    }
)


// 获取轮播图数据 
export let getSliders = () => {
    return axios.get('/sliders');
};

// 获取热门图书数据   截取最后6个图书
export let getBooks = () =>{
    return axios.get('/hot');
};

// 添加loading 效果 当轮播图数据 和 热门图书数据 同时获取成功 再加载数据
export let getAllData =()=>{
   return  axios.all([getSliders(),getBooks()]);
};


// 获取全部图书
export let getAllbooks = () =>{
    return axios.get('/book');
};



// 传入id  获取某一本图书
export let oneBook = (id)=>{
    return axios.get(`/book?id=${id}`);
};

//  传入id  删除某一本图书
export let removeBook = (id)=>{
   return axios.delete(`/book?id=${id}`);
};

// 修改图书发送的接口  
// put请求 既要通过url路径地址传参 id ，也要通过请求主体传参 data
export let updataBook = (id,data)=>{
    return axios.put(`/book?id=${id}`,data);
};

// 添加图书的接口
export let addBook = (data) =>{
    return axios.post('/book',data);
};

// 下拉加载更多数据的接口， 根据偏移量，返回对应的数据
//  offset为5, 返回的就是5-10条    5，6，7，8，9  
export let pageBook = (offset)=>{
    return axios.get(`/page?offset=${offset}`);
};