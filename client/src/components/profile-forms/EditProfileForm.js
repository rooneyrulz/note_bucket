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
import { changeProfile, getCurrentProfile } from '../../actions/profile';
import setAlert from '../../actions/alert';

const EditProfileForm = ({
  profile: { profile, loading },
  changeProfile,
  setAlert,
  getCurrentProfile,
  history
}) => {
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

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      ...formData,
      name: loading || !profile.name ? '' : profile.name,
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      status: loading || !profile.status ? '' : profile.status,
      location: loading || !profile.location ? '' : profile.location,
      age: loading || !profile.age ? '' : profile.age,
      profession: loading || !profile.profession ? '' : profile.profession,
      bio: loading || !profile.bio ? '' : profile.bio,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
      twitter: loading || !profile.twitter ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      instagram: loading || !profile.social ? '' : profile.social.instagram,
      github: loading || !profile.social ? '' : profile.social.github,
      skills: loading || !profile.skills ? '' : profile.skills.join(',')
    });
  }, [getCurrentProfile, loading]);

  const {
    name,
    company,
    website,
    status,
    location,
    profession,
    age,
    skills,
    bio,
    youtube,
    facebook,
    twitter,
    linkedin,
    instagram,
    github
  } = formData;

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
              value={name}
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
              value={company}
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
              value={website}
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
              value={location}
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
              value={status}
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
              value={age}
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
              value={profession}
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
              value={skills}
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
              value={bio}
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
                value={youtube}
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
                value={facebook}
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
                value={twitter}
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
                value={linkedin}
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
                value={instagram}
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
                value={github}
                placeholder='Github link'
                onChange={e => onHandleChange(e)}
              />
            </FormGroup>
          </Col>
        </Row>
      </Collapse>
      <Button type='submit' color='outline-secondary' className='btn-lg'>
        Update
      </Button>
    </Form>
  );
};

EditProfileForm.propTypes = {
  changeProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { changeProfile, getCurrentProfile, setAlert }
)(EditProfileForm);
