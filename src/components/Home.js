import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card,Button,Row} from 'react-bootstrap'
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';


class Home extends React.Component {

  constructor(props){
    super(props);
    this.state={
      cryptoArr:[],
      postArr:[]
    }
  }

  componentDidMount=()=>{
    let url=`http://localhost:3002/Cryptos`;

    axios.get(url).then(item=>{
      this.setState({
      cryptoArr:item.data,

      })
    })
    .catch();


  }

  sendFav=(index)=>{
    const {user}=this.props.auth0;
    let favData={
      email:user.email,
      title:this.state.cryptoArr[index].title,
      image_url:this.state.cryptoArr[index].image_url,
      toUSD:this.state.cryptoArr[index].toUSD,
      description:this.state.cryptoArr[index].description,



    }

    let url=`http://localhost:3002/cryptoAdd`;
    axios.post(url,favData).then(item=>{
      this.setState({
        postArr:item.data
      })
    })
    .catch()
  }

  render() {
    return (
      <>
     
        <h1>Crypto List</h1>
        {
           <Row xs={3} md={3}>{
        this.state.cryptoArr.map((item,idx)=>{
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
    <Button variant="primary" onClick={()=>{this.sendFav(idx)}}>Add to favourite</Button>
  </Card.Body>
</Card>
          )
        })
       
      }
       </Row>
        }

      </>
    )
  }
}

export default withAuth0(Home);
