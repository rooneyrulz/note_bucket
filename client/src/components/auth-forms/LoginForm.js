import React from 'react';
import {
  Form,
  FormGroup,
  Input,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle
} from 'reactstrap';

const LoginForm = () => {
  const onHandleChange = e => {};

  return (
    <Card style={{ width: '60%', margin: 'auto' }}>
      <CardHeader className="text-center">
        <CardTitle>
          <h1 className="text-primary">Sign In</h1>
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Form>
          <FormGroup>
            <Input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              className="form-control-lg"
              onChange={e => onHandleChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              className="form-control-lg"
              onChange={e => onHandleChange(e)}
            />
          </FormGroup>
        </Form>
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <Button className="btn-lg" type="submit" color="success">
            Sign In
          </Button>
          <Button className="btn-lg" type="button" color="secondary">
            Back
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
