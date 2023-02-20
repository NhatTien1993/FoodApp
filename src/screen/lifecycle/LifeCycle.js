import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'

export class LifeCycle extends Component {
state= {
    data:[],
    isLoadding: false
}

    constructor(props) {
        super(props)
        //Khai báo biến, giá trị mặc định, state, khởi tao class
        console.log('Constructor')
    }

    //Hàm này chỉ hoạt động khi nó là con của 1 component khac
    // static getDerivedStateFromProps(preProps,state) {
    //     //preProps: chứa toàn bộ thuộc tính của component cha truyền qua,
    //     //Sử dụng khi mong muốn xử lý logic code của props mà component cha truyền qua và gán giá trị lại cho state hoặc logic code
    //     console.log('getDerivedStateFromProps')
    //     console.log(preProps.name)
    //     console.log(state)
    //     if(preProps.name == 'TienNhat') {
    //         return {
    //             count:3
    //         }
    //     }
    //     return null

    //     // Return phải lại state,khi muốn thay đổi state
    //     // return {
    //     //     count:1
    //     // }
    // }

    // shouldComponentUpdate(nextProps,nextState){
    //     console.log('should Componentpdate')
    //     return true

    // }
    ListMovie ({item}){
        // console.log(item)
        return(
            <View style={{flexDirection:'row'}}>
                <Text style={{paddingRight:20}}>{item.title}</Text>
                <Text>Năm khởi chiếu: {item.releaseYear}</Text>
            </View>
        )
    }
    async getMovie() {
      try{
        // Fetch là 1 worker thread ( chỉ xử lý logic code, ko render giao diện. nó mở ra 1 luồng riêng để xủ lý riêng(chạy bất đồng bộ với luồng main thread(render gia diên))
        const response = await fetch('https://reactnative.dev/movies.json')
        const json = await response.json()
        this.setState({data : json.movies})
      } catch(error) {
        console.error(error);
      } finally {
        this.setState({ isLoading: true });
      }
  
    }
    render() {
        console.log(this.state.data)
        // hạn chế dùng logic code ở hàm render. chỉ ưu tiên render ra giao diện
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                {this.state.isLoadding ? <ActivityIndicator/> : <FlatList
                style={{paddingTop:50}}
                data={this.state.data}
                renderItem={this.ListMovie}
                />}
            </View>
        )
    }
    // componentDidUpdate(){
    //     console.log('componentDidUpdate')

    // }
    componentDidMount() {
        // nó chạy sau khi giao diện đc hiển thị.
        // dùng để load data, xử lý call api
        console.log('componentDidMount')
       this.getMovie()
    }
}

export default LifeCycle