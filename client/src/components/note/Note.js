import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// COMPONENTS
import EditNoteModal from '../modals/EditNoteModal';

// REDUX
import { deleteNote } from '../../actions/note';
import setAlert from '../../actions/alert';

const Note = ({ note, deleteNote, setAlert }) => {
  const onHandleDelete = id => {
    deleteNote(id);
    setAlert('A note has been successfully delete!', 200, 'success');
  };

  return (
    <div
      className='Note'
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#333',
        padding: '1rem',
        color: '#f4f4f4',
        borderRadius: '.5em'
      }}
    >
      <span>{note.title}</span>
      <div className='btn-group'>
        <Fragment>
          <EditNoteModal note={note} />
        </Fragment>
        <a
          href='#!'
          className='btn btn-sm btn-danger'
          onClick={e => onHandleDelete(note._id)}
        >
          Delete
        </a>
      </div>
    </div>
  );
};

Note.propTypes = {
  deleteNote: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteNote, setAlert }
)(Note);
