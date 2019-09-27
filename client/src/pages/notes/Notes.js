import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// COMPONENT
import CreateNoteModal from '../../components/modals/CreateNoteModal';
import NoteComponent from '../../components/note/Note';
import Spinner from '../../layouts/Spinner';

// REDUX
import { getNotes } from '../../actions/note';

const Notes = ({ note: { notes, loading }, getNotes, history }) => {
  useEffect(() => {
    setInterval(() => getNotes(), 500);
  }, []);

  return loading ? (
    <Spinner />
  ) : (
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
      <hr />
      <br />
      <div className='notes-content'>
        {notes.length < 1 ? (
          <p className='lead text-muted'>
            It seems you have not created any notes yet, Let's create one..
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gridGap: '1rem',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {notes.map(note => (
              <NoteComponent key={note.id} note={note} />
            ))}
          </div>
        )}
      </div>
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
