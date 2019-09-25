import React from 'react';

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
        <a href='#!' className='btn btn-sm btn-light'>
          Edit
        </a>
        <a href='#!' className='btn btn-sm btn-danger'>
          Delete
        </a>
      </div>
    </div>
  );
};

export default Note;
