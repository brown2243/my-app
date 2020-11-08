import React,{Component} from 'react'
import './App.css';
import Toc from './components/Toc'
import Subject from './components/Subject'
import Control from './components/Control'
import ReadContent from './components/ReadContent'
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';

// props,state의 값이 바뀌면 화면이 다시 그려진다.
// bind(this)가 없으면 원래 this는 컴포넌트값을 가리켜야 아무 값도 배정받지 못함.)
class App extends Component {
  constructor(props){ // 어떤 컴포넌트가 실행 될 때 render 보다 먼저 실행되면서 그 컴포넌트를 초기화 시켜주고 싶은 코드는 컨스트럭터 안에 작성한다.
    super(props)
    this.max_content_id = 3 //UI 에 필요없는 값이라 state안에 넣지않음
    this.state={
      mode:'welcome',
      selected_content_id:2,
      welcome:{title:'Welcome', desc:'Hello React!!!'},
      subject:{title:'WEB', sub:'World wide Web!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is for information'},
        {id:2, title:'CSS', desc:'CSS if for design'},
        {id:3, title:'Java Script', desc:'Javascript is for interactive'}
      ]
    }
  }
  getReadContent(){
    var i = 0
      while(i < this.state.contents.length){
        var data = this.state.contents[i]
        if(data.id === this.state.selected_content_id){
          return data
        }
        i = i + 1
      }
    }
  getContent(){
    var _title, _desc ,_article = null
    if(this.state.mode === 'welcome'){
      _title=this.state.welcome.title
      _desc=this.state.welcome.desc
      _article=<ReadContent title={_title} desc={_desc}></ReadContent>
    } else if(this.state.mode === 'read'){
        var _content=this.getReadContent()
        _article=<ReadContent   title={_content.title} desc={_content.desc}></ReadContent>
      
    } else if(this.state.mode === 'create'){
      _article=<CreateContent onSubmit={function(_title,_desc){
        this.max_content_id= this.max_content_id+1
        var _contents = this.state.contents.concat({id:this.max_content_id, title:_title, desc:_desc})
        this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        })
      }.bind(this)}></CreateContent>

    } else if(this.state.mode === 'update'){
        _content=this.getReadContent()
        _article=<UpdateContent data={_content} onSubmit={function(_id,_title,_desc){
          var _contents = Array.from(this.state.contents)
          var i = 0
          while(i < _contents.length){
            if(_contents[i].id === _id){
              _contents[i]={id:_id, title:_title, desc:_desc}
            }
            i = i + 1
          }
        this.setState({
          contents:_contents,
          mode:'read'
        })
      }.bind(this)}></UpdateContent>
    }
    return _article
  }

  render(){
    console.log('App render')
    return (
      <div className="App">
        <Subject 
            title={this.state.subject.title} 
            sub={this.state.subject.sub}
            onChangePage={function(){
              this.setState({mode:'welcome'})
            }.bind(this)}></Subject>
    
        <Toc 
            onChangePage={function(id){
              this.setState({
                mode:'read',
                selected_content_id:Number(id)
              })
            }.bind(this)} 
            data={this.state.contents}></Toc>

            <Control onChangeMode={function(_mode){
              if(_mode ==='delete'){
                if(window.confirm('really?')){
                  var _contents = Array.from(this.state.contents)
                  var i = 0
                  while(i < _contents.length){
                    if(_contents[i].id === this.state.selected_content_id){
                      _contents.splice(i,1)
                      break
                    }
                    i = i + 1
                  }
                  this.setState({
                    contents:_contents,
                    mode:'welcome'
                  })
                }
              } else{
                this.setState({
                  mode:_mode
                })
              }
            }.bind(this)}></Control>

            {this.getContent()}
      </div>
    );
  }
}

export default App;
