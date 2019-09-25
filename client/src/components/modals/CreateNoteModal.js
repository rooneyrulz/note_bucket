import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
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
import { addNote } from '../../actions/note';
import setAlert from '../../actions/alert';

const CreateNoteModal = ({
  isAuthenticated,
  alert,
  setAlert,
  addNote,
  history
}) => {
  const [isOpen, setisOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    text: ''
  });

  const { title, text } = formData;

  const toggle = e => setisOpen(!isOpen);

  // if (!isAuthenticated) history.push('/sign-in');

  const onHandleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onHandleSubmit = e => {
    e.preventDefault();

    if (!title || !text) {
      setAlert(
        'Please fill out all fields',
        400,
        'danger',
        'NOTE_CREATE_ERROR'
      );
    } else {
      addNote(formData, history);

      const msgs = alert.filter(alrt => alrt.textId === 'CREATE_NOTE_ERROR');

      if (msgs.length < 1) {
        toggle();
      }
    }
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
                name='text'
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

CreateNoteModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  alert: PropTypes.array.isRequired,
  setAlert: PropTypes.func.isRequired,
  addNote: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  alert: state.alert
});

export default connect(
  mapStateToProps,
  { setAlert, addNote }
)(withRouter(CreateNoteModal));
