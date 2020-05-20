import React, { Component } from 'react'
import { Text, View ,FlatList, Button,Image} from 'react-native'


export default class FlatDemo extends Component {

    constructor(props){
        super(props)
        this.url="http://www.cjlly.com:3009/record"
        this.max=4
        this.state={data:[],albums:[]}
    }

    componentDidMount(){
        fetch(this.url,{method:"GET"})
        .then(resp=>resp.json())
        .then(albums=>{
            console.log(albums)
            this.setState({albums:albums})
        })
    }

    _del=id=>{
        
        fetch(this.url+"/"+id,{method:"DELETE"})
        .then(resp=>resp.json())
        .then(obj=>{
            let data=this.state.albums.splice(0)
            let index=data.findIndex(album=>album.id===id)
            console.log(index,id)
            data.splice(index,1)
            this.setState({albums:data})
        })

       
    }
    _renderItem=({item})=>{
        return (
            <View style={{height:150,justifyContent:"space-between"}}>
                <Text>{item.name}</Text>
                <Image style={{width:80,height:80}} source={{uri:item.img}}/>
                <Button onPress={()=>this._del(item.id)} title="删除"/>
            </View>
        )
    }
    _ItemSeparatorComponent=()=>{
        return <View style={{height:1,backgroundColor:"red"}}></View>
    }

    _refresh=()=>{
        let d=Math.floor(Math.random()*100+100)
        let data=this.state.data.splice(0)
        data.unshift(d)
        this.setState({data:data})
    }
    _reachEnd=()=>{
        let data=this.state.data.splice(0)
        data.push(++this.max)
        this.setState({data:data})
    }
    


    render() {
        return (
            <View>
                <FlatList
                    ListEmptyComponent={<Text>数据是空的</Text>}
                    keyExtractor={({item,index})=>index}
                    ItemSeparatorComponent={this._ItemSeparatorComponent}
                    data={this.state.albums} 
                    renderItem={this._renderItem}
                    // refreshing={false}
                    // onRefresh={this._refresh}
                    // onEndReached={this._reachEnd}
                    // onEndReachedThreshold={0.2}
                />
            </View>
        )
    }
}
