import React, { Component } from 'react';
import { Grid,Panel, FormGroup, ControlLabel, Modal, Table, FormControl, Button} from 'react-bootstrap';
import './App.css';
// import $ from 'jquery';


class DisplayTable extends Component {
  constructor(props){
    super(props);
    this.state=({
      rows: this.props.data,
      isSort:this.props.isSort,
    });
    
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  
  handleDelete (index){
    let row = this.state.rows;
    row.splice(index,1);
  this.setState({
    rows:row
  });
  }
  
  render() {
    let dat;
    
    if (this.state.isSort || this.props.isSort){
      dat=this.state.rows;
      dat.sort((a,b)=>{return (parseInt(a.retweetCounts,10)-parseInt(b.retweetCounts,10))*-1 });
    }
    
    return (

        <Table bordered hover striped>
          <thead>
            <tr>
            <th>Profile image</th>
            <th>Username</th>
            <th>Tweet</th>
            <th>Retweet counts <br /><Button bsStyle="link" bsSize="xsmall" onClick={()=>this.setState({isSort:true})}>&#x25BC;</Button></th>
            <th>Date</th>
            <th>More info</th>
            <th>Delete row</th>
            </tr>
            
          </thead>
          <tbody>
          {this.state.rows.map((data,i)=>{
          if (i<this.props.number && data){
            return (
              <Rows contents={data} key={i} id={i} onHandleClick={this.handleDelete}/>
              );
          }else if (!data){
            return (
            <Rows contents={''}/>
            );
          }
          return null;
          })}
          </tbody>
        </Table>   

    );
  }

}

class ModalDisplay extends Component {
  render (){
    return (
      <Modal
        {...this.props}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">More</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Learn more about this tweet</h4>
          <Table>
          <thead>
          <tr>
            <th>Time zone</th>
            <th>Location</th>
            <th>Friends</th>
            <th>Description</th>
            <th>Followers</th>
            </tr>
         
          </thead>
          
          <tbody>
          <tr>
          <td>{this.props.data.timeZone}</td>
          <td>{this.props.data.loc}</td>
          <td>{this.props.data.friends}</td>
          <td>{this.props.data.descrip}</td>
          <td>{this.props.data.followers}</td>
          </tr>
          </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
      );
  }
}

class FilterForm extends Component {
  constructor(props,context) {
    super(props,context);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      iniLength:this.props.number,
      value: '',
    };
  }
  
  getValidationState(num) {
    if (num==='') return null;
    else  if (isNaN(Number(num)) || Number(num) <= 0 || Number(num)> this.state.iniLength) return 'error';
    return 'success';
  }
  
  handleChange(e) {
      this.setState({value: e.target.value});
      if (this.getValidationState(e.target.value)==='success'){
        this.props.onNumberFilter(e.target.value);
      }else if (this.getValidationState(e.target.value)===null){
        this.props.onNumberFilter(10);
      }
  }
  
  render () {
    return (
      <form>
      <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState(this.state.value)}
        >
          <ControlLabel>Display # of tweets with highest retweet-counts</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter Number"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <small>Please enter an integer between 1 to {this.state.iniLength}</small>
        </FormGroup>
        {this.getValidationState(this.state.value) ==='error' && <p className="text-danger">Your input is invalid!</p>}
      </form>
      );
  }
}

// class Header extends Component {
//   render () {
//     const category = this.props.category.map((content,i)=> {
//       return (
//         <th key={i}>
//         {content}
//         </th>
//         );
//     });
    
//     return (
//       <tr>
//         {category}
//       </tr>
//     );
//   }
// }

class Rows extends Component {
  constructor(props,context){
    super(props,context);
    
    this.state = {
      show:false,
    };
    
    this.handleDelete = this.handleDelete.bind(this);
  }
  
handleDelete(index){
  this.props.onHandleClick(index);
}

checkVal(val){
  if (val){
    return val;
  }
  return 'Your data is missing!';
}
  
  render () {
    let modalClose = () => this.setState({show:false});
    
    return (
    <tr>
        <td><img src={this.props.contents.profileImg} alt={'Your profile here'} /></td>
        <td>{this.checkVal(this.props.contents.username)}</td>
        <td>{this.checkVal(this.props.contents.tweet)}</td>
        <td>{this.checkVal(this.props.contents.retweetCounts)}</td>
        <td>{this.checkVal(this.props.contents.date)}</td>
        <td> <Button bsStyle='success' bsSize='small' onClick={()=> this.setState({show: true})}>More</Button></td>
        <td> <Button bsStyle='danger' bsSize='small' onClick={()=>this.handleDelete(this.props.id)}>Delete</Button></td> 
        <ModalDisplay show={this.state.show} onHide={modalClose} data={this.props.contents}/>
    </tr>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      length:this.props.data.length,
      isSort:false,
    };
    
    this.numberFilter = this.numberFilter.bind(this);
  }

  
  numberFilter (num){
    if (!isNaN(Number(num))){
      this.setState({
        length:num,
        isSort:true,
      });
    }
  }
  
  
  render() {
 
    return (
      <Panel bsStyle="primary">
      <Panel.Heading>
      <Panel.Title componentClass="h3">Tweeter table</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
      
      <Grid className="center">
      
      <DisplayTable data={this.props.data} number={this.state.length} isSort={this.state.isSort}/>
      <FilterForm number={this.state.length} onNumberFilter={this.numberFilter}/>
      
      </Grid>
      </Panel.Body>
      </Panel>
    );
  }
}


export default App;
