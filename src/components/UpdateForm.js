

import React, { Component } from 'react'
import {Modal,Button,Form} from 'react-bootstrap'


export class UpdateForm extends Component {
    render() {
        return (
            <div>
                
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Updated crypto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={this.props.updateCrypto}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="Enter email" name="title" defaultValue={this.props.title}/>
 
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Image</Form.Label>
    <Form.Control type="text" placeholder="Password"  name="image_url" defaultValue={this.props.image_url}  />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Currency</Form.Label>
    <Form.Control type="number" placeholder="Password"  name="toUSD" defaultValue={this.props.toUSD} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>description</Form.Label>
    <Form.Control type="text" placeholder="Password"  name="description" defaultValue={this.props.description} />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
                
            </div>
        )
    }
}

export default UpdateForm
