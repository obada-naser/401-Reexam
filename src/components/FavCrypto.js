import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button} from 'react-bootstrap'
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

import UpdateForm from './UpdateForm';
class FavCrypto extends React.Component {
  constructor(props){
    super(props);
    this.state={
      cryptoFav:[],
      show:false,
      indexUpdate:0
      
    }
  }

  componentDidMount=()=>{
    const {user}=this.props.auth0

    let url=`http://localhost:3002/cryptoGet?email=${user.email}`;

    axios.get(url).then(item=>{
      this.setState({
        cryptoFav:item.data,

      })
    })
    .catch();


  }
  deleteCrypto=(index)=>{
    const {user}=this.props.auth0;
    let data={
      email:user.email,
    }
    axios.delete(`http://localhost:3002/cryptoDelete/${index}`,{params:data}).then(data=>{
      this.setState({
        cryptoFav:data.data.crypto
      })
    })
    .catch()
  }
  handleClose=()=>{
    this.setState({
      show:false
    })
  }

  handleUpdate=(index)=>{
    this.setState({
      show:true,
      indexUpdate:index,
      title:this.state.cryptoFav[index].title,
      image_url:this.state.cryptoFav[index].image_url,
      toUSD:this.state.cryptoFav[index].toUSD,
      description:this.state.cryptoFav[index].description,


    })
  }

  updateCrypto=async(event)=>{
    const {user}=this.props.auth0;
    event.preventDefault();

    let sendData={
      email:user.email,
      title:event.target.title.value,
      image_url:event.target.image_url.value,
      toUSD:event.target.toUSD.value,
      description:event.target.description.value,
    }

    const update=await axios.put(`http://localhost:3002/cryptoupdate/${this.state.index}`,sendData);
    this.setState({
      cryptoFav:update.data,
      show:false
    })
  }





  render() {
    return(
      <>
        <h1>Fav Crypto List</h1>

        {

          this.state.show &&(
           < UpdateForm
            show={this.state.show}
            title={this.state.title}
            toUSD={this.state.toUSD}
            description={this.state.description}
            handleClose={this.handleClose}
            updateCrypto={this.updateCrypto}

            />
          )
        }
        
        {
        this.state.cryptoFav.map((item,idx)=>{
          return(
        <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={item.image_url} />
  <Card.Body>
    <Card.Title>{item.title}</Card.Title>
    <Card.Text>
      {item.toUSD}
    </Card.Text>
    <Card.Text>
      {item.description}
    </Card.Text>
    <Button variant="danger" onClick={()=>{this.deleteCrypto(idx)}}>Delete</Button>
    <Button variant="primary" onClick={()=>{this.handleUpdate(idx)}}>Update</Button>
  </Card.Body>
</Card>
          )
        })

        }



      </>
    )
  }
}

export default withAuth0(FavCrypto);
