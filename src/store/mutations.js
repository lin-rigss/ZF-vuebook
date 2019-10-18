import * as types from './mutations-type'

const mutations = {
   [types.ADD_CART](state,book){   // book 是添加的一本书        
       let product = state.cartList.find(item=>item.bookId === book.bookId);
       if(product){ // 如果数据中有这本书，就增加其数量 
           product.bookCount +=1;
           state.cartList = [...state.cartList]
       }else {  // 如果数据中没有，就添加数量属性 设置为1 ，然后将新数据与老数据合并。再赋值给数据。
           book.bookCount = 1;
           state.cartList = [...state.cartList, book]
       }
   }

//    tocar(state,book){   // book 是添加的一本书        
//     let product = state.cartList.find(item=>item.bookId === book.bookId);
//     if(product){ // 如果数据中有这本书，就增加其数量 
//         product.bookCount +=1;
//         state.cartList = [...state.cartList]
//     }else {  // 如果数据中没有，就添加数量属性 设置为1 ，然后将新数据与老数据合并。再赋值给数据。
//         book.bookCount = 1;
//         state.cartList = [...state.cartList, book]
//     }
// }
}
export default mutations