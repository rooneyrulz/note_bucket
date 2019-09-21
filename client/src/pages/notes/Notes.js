import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// COMPONENT
import CreateNoteModal from '../../components/modals/CreateNoteModal';

// REDUX
import { getNotes } from '../../actions/note';

const Notes = ({ note: { notes, loading }, getNotes }) => {
  useEffect(() => {
    getNotes();
  }, [getNotes]);

  return (
    <div className='Notes'>
      <header
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <h1 className='text-primary'>Notes</h1>
        <div>
          <CreateNoteModal />
        </div>
      </header>
      {notes.length < 1 ? (
        <p className='lead text-muted'>
          It seems you have not created any notes yet, Let's create one..
        </p>
      ) : (
        notes.map(note => <p>{note.title}</p>)
      )}
    </div>
  );
};

Notes.propTypes = {
  note: PropTypes.object.isRequired,
  getNotes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  note: state.note
});

export default connect(
  mapStateToProps,
  { getNotes }
)(Notes);
