let http = require('http');
let fs = require('fs');
let url = require('url');

// 获取轮播图接口 /sliders
let sliders= require('./sliders');

// 封装读取文件的方法
function read(cb){
   fs.readFile('./book.json','utf8',function(err,data){
       if( err || data.length == 0){
           cb([]);
       }else{
           cb(JSON.parse(data));
       }
   })
}
// 封装写文件的方法
function write(data,cb){
    fs.writeFile('./book.json',JSON.stringify(data),cb)
}

let pageSize = 5;

http.createServer((req,res)=>{
    // node 实现跨域
    res.setHeader('Access-Control-Allow-Origin',"*");    
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");   
    res.setHeader('Access-Control-Allow-Methods',"GET,POST,PUT,OPTIONS,DELETE");
    res.setHeader("X-Powered-By",' 3.2.1');
    res.setHeader('Access-Control-Allow-Credentials',true);   
    if(req.method == 'OPTIONS') return res.end();
    

    let {pathname,query} = url.parse(req.url,true);

    // 轮播图接口 /sliders
    if(pathname === '/sliders'){
       // 设置响应头 （如果不设置返回的数据则是乱码）
       res.setHeader('Content-Type','application/json;charset=utf8')
       res.end(JSON.stringify(sliders))
    }

    // 热门图书接口
    if(pathname === '/hot'){
       read(function(books){
           let hot = books.reverse().slice(0,6);
           res.setHeader('Content-Type','application/json;charset=utf8')
           res.end(JSON.stringify(hot));
       });
       return
    }

    // 下拉加载更多接口  
    if(pathname === '/page'){
        // 获取前端传递的 offset值 
        let offset = parseInt(query.offset) || 0;
        // 读文件获取books数据
        read(function(books){
            // 将数据倒序 截取，每次偏移量 在偏移的基础上增加5条。
            let result =  books.reverse().slice(offset,offset+pageSize);
            let hasMore = true;
            // 如果 已经显示的数目，大于了总数据的条度 
            if(books.length <= offset + pageSize){
                hasMore = false;                
            }
            res.setHeader('Content-Type','application/json;charset=utf8')
            res.end(JSON.stringify({hasMore,books:result}))
        }) 
        return;          
    }
   

    // /book接口的增删改查   
    // restful写接口的 一种架构风格（设计风格），根据请求方式的不同进行数据的增删改查
    if(pathname === '/book'){
        let id = parseInt(query.id);
        switch (req.method) {
            case 'GET':
                if(!isNaN(id)){ // 有id 就是查询一个
                    read(function(books){
                        let book = books.find(item=>item.bookId === id);
                        if(!book) book={};  // 如果没有找到就返回一个空对象
                        res.setHeader('Content-Type','application/json;charset=utf8')
                        res.end(JSON.stringify(book));
                    });

                }else{  // 没有id就是获取所有图片
                    read(function(books){
                        res.setHeader('Content-Type','application/json;charset=utf8')
                        res.end(JSON.stringify(books.reverse()));
                    });
                }
                break;
            case 'POST':
                let str ='';
                req.on('data',chunk=>{
                    str += chunk;
                });
                req.on('end',()=>{
                    let book = JSON.parse(str);
                    read(function(books){
                      book.bookId = books.length?books[books.length-1].bookId+1:1;
                      books.push(book);
                      write(books,function(){
                          res.end(JSON.stringify(book));
                      });
                    });
                })                
                break;
            case 'PUT':
                if(id){  // 获取了当前要修改的id 
                    // 接收请求体中的内容, 找到id相同的的数据进行修改。 
                    let str ='';
                    req.on('data',chunk=>{
                        str+=chunk;
                    });
                    req.on('end',()=>{
                        let book = JSON.parse(str);
                        read(function(books){
                           books = books.map(item=>{
                               if(item.bookId === id){
                                   return book
                               }
                               return item; // 其它数据正常返回，不做处理。
                           });
                           // 将数据写回JSON中
                           write(books,function(){
                               res.end(JSON.stringify(book));
                           })
                        })
                    })
                }                
                break;
           case 'DELETE':
                 read(function(books){
                     books = books.filter(item=>item.bookId !== id )
                     write(books,function(){
                         res.end(JSON.stringify({})) // 删除操作返回空对象
                     })
                 })                  
                break;
        }
        return
    }

}).listen(3000);