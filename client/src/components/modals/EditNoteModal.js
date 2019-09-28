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
import { updateNote } from '../../actions/note';
import setAlert from '../../actions/alert';

const EditNoteModal = ({ note, updateNote, setAlert, alert }) => {
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
      setAlert(
        'Please fill out all fields!',
        400,
        'danger',
        'NOTE_UPDATE_ERROR'
      );
    } else {
      updateNote(formData, note._id);

      const msgs = alert.filter(alrt => alrt.textId === 'NOTE_UPDATE_ERROR')
        .length;

      if (msgs < 1) {
        toggle();
      }

      setAlert('Note has been successfully updated!', 200, 'success');
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
            {alert.map(
              alrt =>
                alrt.textId === 'NOTE_UPDATE_ERROR' && (
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
                placeholder='Enter new title'
                onChange={e => onHandleChange(e)}
              />
              <small className='text-muted'>Old title: {note.title}</small>
            </FormGroup>
            <FormGroup>
              <textarea
                className='form-control'
                id='description'
                name='text'
                type='text'
                placeholder='Enter new description'
                onChange={e => onHandleChange(e)}
              />
              <small className='text-muted'>Old description: {note.text}</small>
            </FormGroup>
            <Button block color='outline-dark' type='submit'>
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

EditNoteModal.propTypes = {
  alert: PropTypes.array.isRequired,
  updateNote: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(
  mapStateToProps,
  { updateNote, setAlert }
)(EditNoteModal);
