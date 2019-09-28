import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// COMPONENTS
import EditNoteModal from '../modals/EditNoteModal';

const Note = ({ note }) => {
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
        <a href='#!' className='btn btn-sm btn-outline-danger'>
          Delete
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  null
)(Note);
