import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
import setAlert from '../../actions/alert';

const CreateNoteModal = ({ alert, setAlert }) => {
  const [isOpen, setisOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const { title, description } = formData;

  const toggle = e => setisOpen(!isOpen);

  const onHandleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onHandleSubmit = e => {
    e.preventDefault();

    if (!title || !description) {
      setAlert(
        'Please fill out all fields',
        400,
        'danger',
        'NOTE_CREATE_ERROR'
      );
    }
    console.log(formData);
  };

  return (
    <Fragment>
      <Button onClick={e => toggle(e)} type='button' color='success'>
        Create
      </Button>
      <Modal isOpen={isOpen}>
        <ModalHeader toggle={e => toggle(e)}>Create Notes</ModalHeader>
        <ModalBody>
          <Form onSubmit={e => onHandleSubmit(e)}>
            {alert.map(
              alrt =>
                alrt.textId === 'NOTE_CREATE_ERROR' && (
                  <span key={alrt.id}>
                    <Alert color={alrt.alertType}>{alrt.msg}</Alert>
                  </span>
                )
            )}
            <FormGroup>
              <Input
                id='title'
                name='title'
                type='text'
                placeholder='Enter title'
                onChange={e => onHandleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <textarea
                className='form-control'
                id='description'
                name='description'
                type='text'
                placeholder='Enter description'
                onChange={e => onHandleChange(e)}
              />
            </FormGroup>
            <Button block color='success' type='submit'>
              Create
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

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(
  mapStateToProps,
  { setAlert }
)(CreateNoteModal);
