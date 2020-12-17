import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

class PaymentTypeModal extends React.Component {
    state = {
      modal: false,
    };

    toggleModal = () => {
      this.setState({ modal: !this.setState.modal });
    }

    render() {
      return (
            <div>
              <Button color="danger" onClick={this.toggleModal}>click here</Button>
              <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Modal title</ModalHeader>
                <ModalBody>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit,  in culpa qui officia deserunt mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={this.toggleModal}>Do Something</Button>{' '}
                  <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                </ModalFooter>
              </Modal>
        </div>
      );
    }
}

export default PaymentTypeModal;
