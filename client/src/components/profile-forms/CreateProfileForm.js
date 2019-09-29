import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Collapse
} from 'reactstrap';

// REDUX
import { changeProfile } from '../../actions/profile';
import setAlert from '../../actions/alert';

const CreateProfileForm = ({ changeProfile, setAlert, history }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    website: '',
    status: '',
    location: '',
    age: '',
    profession: '',
    skills: '',
    bio: '',
    youtube: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: '',
    github: ''
  });

  const { name, status, location, profession } = formData;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = e => setIsOpen(!isOpen);

  const onHandleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onHandleSubmit = e => {
    e.preventDefault();

    if (!name || !status || !location || !profession) {
      setAlert(
        'Please fill out required fields!',
        400,
        'danger',
        'PROFILE_CREATE_ERROR'
      );
    }

    changeProfile(formData, history);
    setAlert('A profile has been successfully created!', 201, 'success');
  };

  return (
    <Form onSubmit={e => onHandleSubmit(e)}>
      <Row>
        <Col sm='12'>
          <FormGroup>
            <Label htmlFor='name'>Name</Label>
            <Input
              className='form-control-lg'
              type='text'
              name='name'
              id='name'
              placeholder='* Enter name'
              onChange={e => onHandleChange(e)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm='6'>
          <FormGroup>
            <Label htmlFor='company'>Company</Label>
            <Input
              className='form-control-lg'
              type='text'
              name='company'
              id='company'
              placeholder='Enter company'
              onChange={e => onHandleChange(e)}
            />
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <Label htmlFor='website'>Website</Label>
            <Input
              className='form-control-lg'
              type='text'
              name='website'
              id='website'
              placeholder='Enter website'
              onChange={e => onHandleChange(e)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm='6'>
          <FormGroup>
            <Label htmlFor='location'>Location</Label>
            <Input
              className='form-control-lg'
              type='text'
              name='location'
              id='location'
              placeholder='* Enter location'
              onChange={e => onHandleChange(e)}
            />
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <Label htmlFor='status'>Status</Label>
            <select
              id='status'
              type='select'
              className='form-control form-control-lg'
              name='status'
              onChange={e => onHandleChange(e)}
            >
              <option value='0'>* Status</option>
              <option value='Male'>Male</option>
              <option value='Female'>Female</option>
            </select>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm='6'>
          <FormGroup>
            <Label htmlFor='age'>Age</Label>
            <Input
              className='form-control-lg'
              type='number'
              name='age'
              id='age'
              placeholder='Enter age'
              onChange={e => onHandleChange(e)}
            />
          </FormGroup>
        </Col>
        <Col sm='6'>
          <FormGroup>
            <Label htmlFor='profession'>Profession</Label>
            <select
              className='form-control form-control-lg'
              type='select'
              id='profession'
              name='profession'
              onChange={e => onHandleChange(e)}
            >
              <option value='0'>* Select Profession</option>
              <option value='Developer'>Developer</option>
              <option value='Junior Developer'>Junior Developer</option>
              <option value='Senior Developer'>Senior Developer</option>
              <option value='Manager'>Manager</option>
              <option value='Student or Learning'>Student or Learning</option>
              <option value='Instructor'>Instructor or Teacher</option>
              <option value='Intern'>Intern</option>
              <option value='Other'>Other</option>
            </select>
            <small className='form-text'>
              Give us an idea of where you are at in your career
            </small>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm='12'>
          <FormGroup>
            <Label htmlFor='skills'>Skills</Label>
            <Input
              className='form-control-lg'
              type='text'
              name='skills'
              id='skills'
              placeholder='Eg:- Teaching, Programing, Managing..'
              onChange={e => onHandleChange(e)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm='12'>
          <FormGroup>
            <Label htmlFor='bio'>Bio</Label>
            <textarea
              className='form-control form-control-lg'
              type='text'
              name='bio'
              id='bio'
              placeholder='Tell me about yourself'
              onChange={e => onHandleChange(e)}
            ></textarea>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col sm='12'>
          <FormGroup>
            <Link
              onClick={e => toggle(e)}
              to='#!'
              className='btn btn-outline-secondary btn-block'
            >
              Add Social Links
            </Link>
          </FormGroup>
        </Col>
      </Row>
      <Collapse isOpen={isOpen}>
        <Row>
          <Col sm='6'>
            <FormGroup>
              <Label htmlFor='youtube'>Youtube</Label>
              <Input
                className='form-control'
                type='url'
                name='youtube'
                id='youtube'
                placeholder='Youtube link'
                onChange={e => onHandleChange(e)}
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label htmlFor='facebook'>Facebook</Label>
              <Input
                className='form-control'
                type='url'
                name='facebook'
                id='facebook'
                placeholder='Facebook link'
                onChange={e => onHandleChange(e)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm='6'>
            <FormGroup>
              <Label htmlFor='twitter'>Twitter</Label>
              <Input
                className='form-control'
                type='url'
                name='twitter'
                id='twitter'
                placeholder='Twitter link'
                onChange={e => onHandleChange(e)}
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label htmlFor='linkedin'>LinkedIn</Label>
              <Input
                className='form-control'
                type='url'
                name='linkedin'
                id='linkedin'
                placeholder='LinkedIn link'
                onChange={e => onHandleChange(e)}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm='6'>
            <FormGroup>
              <Label htmlFor='instagram'>Instagram</Label>
              <Input
                className='form-control'
                type='url'
                name='instagram'
                id='instagram'
                placeholder='Instagram link'
                onChange={e => onHandleChange(e)}
              />
            </FormGroup>
          </Col>
          <Col sm='6'>
            <FormGroup>
              <Label htmlFor='github'>Github</Label>
              <Input
                className='form-control'
                type='url'
                name='github'
                id='github'
                placeholder='Github link'
                onChange={e => onHandleChange(e)}
              />
            </FormGroup>
          </Col>
        </Row>
      </Collapse>
      <Button type='submit' color='outline-success' className='btn-lg'>
        Create
      </Button>
    </Form>
  );
};

CreateProfileForm.propTypes = {
  changeProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { changeProfile, setAlert }
)(CreateProfileForm);
