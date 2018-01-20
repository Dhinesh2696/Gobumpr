import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { PropTypes } from 'mobx-react';
import _ from 'lodash';
import Profile from './profile';
import store from '../models/user-store.js';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {blue500} from 'material-ui/styles/colors';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DropDownMenu from 'material-ui/DropDownMenu';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';



const propTypes = {
    store: PropTypes.object
};

@observer
class  App extends Component {
constructor(){
    super();
    this.state={
        flag:true,
        colors:[],
        city:[],
        value:0,
        hotelObj:[],
        hotel:[],
        selectedHotel:'',
        desc:[],
        selectedDesc:'',
        reviews:[],

    }
}

    componentWillMount() {

        console.log("in app");
      this.getCity();
    }
   getCity(){
       this.fetchdata()
           .then((res)=>{
               //console.log(res);
               this.setState({
                   colors:res
               })
              this.setState({
                  city:this.state.colors.map(city=>city.name),  
               
              })
               console.log(this.state.city)
           })
   }
    fetchdata() {
        return fetch('http://192.168.1.20:3000/users')
            .then(function (res) {
                return res.json();
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            })
    }
    
    renderProfiles(){
        if (_.isEmpty(this.state.reviews)) return <h4>No Review Found. Be the first to review!!</h4>;
        console.log(this.state.reviews)
        return this.state.reviews
            .map((review) => {
            return (
                <div>
                <Profile
                    key = {review.id}
                    name = {review.name}
                    content = {review.content}
                    date = {review.time_stamp}
                />
                </div>
            );
        });
}

logout=(e)=>{
    console.log("iin logout")
    localStorage.removeItem("user");
    window.location.href='/';
}

    handleChange = (event, index, value) =>{ this.setState({value:value,selectedHotel:''});
        document.getElementById("bottomDiv").style.display='none'

        this.fetchHotel(value).then((res)=>{
            //console.log(res)
            this.setState({
                hotelObj:res
            })
            this.setState({
                hotel:this.state.hotelObj.map(hotel=>hotel.name),
                desc:this.state.hotelObj.map(hotel=>hotel.description)
            })
            //console.log(this.state.desc)
        })};
    fetchHotel(name){
        this.refs.autocomplete.setState({searchText: ''});
        return fetch('http://192.168.1.20:3000/users/'+name)
            .then(function (res) {
                return res.json();
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            })
    }
    fetchReview(name){

         return fetch('http://192.168.1.20:3000/users/review/'+name)
            .then(function (res) {
                return res.json();
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            })
    }
 searchClick=(e)=>{
       if (_.isEmpty(this.state.desc)) 
            alert("enter valid city and hotel");
        else{
           document.getElementById("bottomDiv").style.display='block';
            this.fetchReview(this.state.selectedHotel).then((res)=>{
            this.setState({
                reviews:res
            })
        });
            this.fetchDes(this.state.selectedHotel).then((res)=>{
            this.setState({
                desc:res
            })
           this.setState({
            selectedDesc:this.state.desc[0]['description']
           })
           var hotel=this.state.desc[0]['id'];
           localStorage.getItem("hotel",hotel)
       });
           }
        }
    fetchDes(name){
       console.log(name);
        return fetch('http://192.168.1.20:3000/users/desc/'+name)
            .then(function(res) {
                return res.json();
            }).catch(function(ex) {
                console.log('parsing failed', ex)
            })
            //document.getElementById("bottom-div").style.display='block'
        }
        postReview(e){
            var mob=localStorage.getItem("user");
            var name=this.state.selectedHotel;
            var content=document.getElementById('desc').value;
            console.log("post"+this.state.selectedHotel)
        fetch('http://192.168.1.20:3000/users/post/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                mobile: mob,
                name: name,
                content:content
            })
        }).then((res, err) => {
            console.log(res, err);
           document.getElementById('desc').value=''
            this.fetchReview(this.state.selectedHotel).then((res)=>{
            this.setState({
                reviews:res
            })
        });

        })

        e.preventDefault();
        return false;
        }
// logout=()=>{
//     console.log("logout")
//     localStorage.removeItem("user");
//     this.props.history.push("/");
// }
    render(){
        const items = [];
        for (let i = 0; i < this.state.city.length; i++ ) {
            items.push(<MenuItem value={this.state.city[i]} label={this.state.city[i]} key={i} primaryText={this.state.city[i]} />);
        }
        const muiTheme = getMuiTheme({
            textField:{
                focusColor:blue500
            }
        });
        const styles = {
            block: {
                maxWidth: 250,
            },
            radioButton: {
                marginBottom: 16,
                marginLeft:20,
                labelPosition:'left',
                width : '32%',
                position :'relative',
                left : '80px',
                checkedColor:'#6495ed'

            },
        };


        return (
            <div className={'container-flui'}>
                <div className={'nav'}>
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                <AppBar
                    title={<span style={{color:'white',textAlign:'center'}}>GoBumpr</span>}
                    iconElementRight={ 
                        <RaisedButton
                            label={'logout'}
                            labelStyle={{color:'white',textTransform:'capitalize'}}
                            backgroundColor={'#A71823'}
                            style={{borderRadius:'5px',marginLeft:'20px',marginBottom:'5px'}}
                            onClick={(e)=>this.logout(e)}
                        />
                                          }
                    showMenuIconButton={false}
                    style={{backgroundColor:'transparent'}}
                />
                    <div className={'drop-search'}>
                        <p style={{color:'white',fontSize:18,fontWeight:'bold',marginRight:'20px'}}>Select city</p>
                    <DropDownMenu maxHeight={300} value={this.state.value}
                                  style={{backgroundColor:'white',borderRadius:'5px',marginRight:'50px'}}
                                  onChange={this.handleChange}
                                  anchorOrigin={{vertical:'bottom',horizontal:'left'}}
                                  >
                        {items}
                    </DropDownMenu>
                        <AutoComplete
                            ref={'autocomplete'}
                            dataSource={this.state.hotel}
                            searchText={this.state.searchText}
                            hintText="Search for Restaurants"
                            style={{backgroundColor:'white',width:'608px',borderRadius:'5px'}}
                            textFieldStyle={{paddingLeft:'10px',width:'608px'}}
                            underlineStyle={{width:'590px'}}
                            underlineFocusStyle={{borderColor:'#A71823'}}
                            onUpdateInput={(val)=>this.setState({
                                selectedHotel:val
                            })}
                           />
                        <RaisedButton
                            label={'Search'}
                            labelStyle={{color:'white',textTransform:'capitalize'}}
                            backgroundColor={'#A71823'}
                            style={{borderRadius:'5px',marginLeft:'20px',marginBottom:'5px'}}
                            onClick={(e)=>this.searchClick(e)}
                        />
                    </div>
                </MuiThemeProvider>
                    <div className={'bottom-div'} id={'bottomDiv'}>
                        <br/>
                        <br/>
                        <br/>
                        <div className="container-fluid">
                            <br/>
                            <br/>
                            <br/>
                            <div className="row">
                                <div className="col-lg-3">
                                    <img src={require("../images/hotel.svg")}/>
                                </div>
                                <div className="col-lg-1"></div>
                                <div className="col-lg-7">

                                    <h1 style={{fontFamily:'monospace'}}>{this.state.selectedHotel}</h1>
                                    <h3 style={{fontFamily:'monospace',textAlign:'left'}}><i className="fa fa-map-marker" aria-hidden="true" style={{color:'#A71823'}}>&nbsp;&nbsp;&nbsp;</i><i>{this.state.value}</i></h3>
                                    <h3 style={{fontFamily:'monospace',textAlign:'left'}}><i className="fa fa-info-circle" aria-hidden="true" >&nbsp;&nbsp;&nbsp;</i><i>About Us :</i></h3>

                                    <p style={{fontSize:20}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{this.state.selectedDesc}</p>
                                </div>

                            </div>
                            <h2 style={{textAlign:'left'}}>Reviews:</h2>
                            <br/>
                            <br/>
                            {this.renderProfiles()}
                              <div class="container">
        <h2>My Review:</h2>
        <form class="form-horizontal">
            <div class="form-group">
                <label class="control-label col-sm-2" for="desc">Description:</label>
                <div class="col-sm-10">
                        <div class="form-group">
                            <textarea class="form-control" id="desc" rows="5" ></textarea>
                        </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-lg btn-success" onClick={(e)=>this.postReview(e)}>Post Your review</button>
                </div>
            </div>
        </form>
    </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

App.propTypes = propTypes;
export default  App;