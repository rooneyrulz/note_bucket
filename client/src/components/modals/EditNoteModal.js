import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Button,
  Alert
} from 'reactstrap';

// REDUX

const EditNoteModal = ({ note, history }) => {
  const [isOpen, setisOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    text: ''
  });

  const { title, text } = formData;

  const toggle = e => setisOpen(!isOpen);

  const onHandleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onHandleSubmit = e => {
    e.preventDefault();

    if (!title || !text) {
      alert('empty fields!');
    } else {
      console.log(formData);
    }
  };

  return (
    <Fragment>
      <Button
        className='btn-sm'
        onClick={e => toggle(e)}
        type='button'
        color='light'
      >
        Edit
      </Button>
      <Modal isOpen={isOpen}>
        <ModalHeader toggle={e => toggle(e)}>Update Notes</ModalHeader>
        <ModalBody>
          <Form onSubmit={e => onHandleSubmit(e)}>
            {/* {alert.map(
              alrt =>
                alrt.textId === 'NOTE_CREATE_ERROR' && (
                  <span key={alrt.id}>
                    <Alert color={alrt.alertType}>{alrt.msg}</Alert>
                  </span>
                )
            )} */}
            <FormGroup>
              <Input
                id='title'
                name='title'
                type='text'
                value={note.title}
                placeholder='Enter title'
                onChange={e => onHandleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <textarea
                className='form-control'
                id='description'
                name='text'
                type='text'
                value={note.text}
                placeholder='Enter description'
                onChange={e => onHandleChange(e)}
              />
            </FormGroup>
            <Button block color='dark' type='submit'>
              Update
            </Button>
          </Form>
        </ModalBody>
        <ModalFooter className=''>
          <span className='text-muted text-center'>
            Note Bucket &copy; By <strong>Ruzny</strong>
          </span>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default withRouter(EditNoteModal);
