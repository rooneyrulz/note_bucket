import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// REDUX
import { getNotes } from '../../actions/note';

const Notes = ({ note: { notes, loading }, getNotes }) => {
  useEffect(() => {
    getNotes();
  }, [getNotes]);

  return (
    <div>
      <h1>Notes</h1>
      {notes.length > 0 && notes.map(note => <p>{note.title}</p>)}
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
