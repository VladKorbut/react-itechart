import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Modal, FormGroup, FormControl, Button } from 'react-bootstrap';
import CopyToClipboard from 'react-copy-to-clipboard';

class QuizLinkModal extends Component {
  constructor() {
    super();
    this.state = {
      copied: false,
    };
  }
  getLink() {
    if (this.props.quizId) {
      return `${window.location.host}/quiz/${this.props.quizId}`;
    } else {
      return '';
    }
  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.close}>
        <Modal.Header closeButton>
          <Modal.Title>You're quiz link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <FormControl
              readOnly
              type="text"
              value={this.getLink()}
            />
          </FormGroup>
          <CopyToClipboard
            text={this.getLink()}
            onCopy={() => this.setState({ copied: true })}
          >
            <Button bsStyle={'primary'} disabled={!this.getLink()}>Copy to clipboard</Button>
          </CopyToClipboard>
          <p>{this.state.copied ? 'copied' : ''}</p>
        </Modal.Body>
      </Modal>
    );
  }
}

QuizLinkModal.propTypes = {
  quizId: propTypes.number,
  show: propTypes.bool,
  close: propTypes.func,
}

export default QuizLinkModal;
