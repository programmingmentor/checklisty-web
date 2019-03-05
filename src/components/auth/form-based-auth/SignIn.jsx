/* eslint-disable no-tabs */
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Input, Button, Grid, Segment, Message, Header, Divider } from 'semantic-ui-react';
import Link from 'react-router-dom/Link';
import style from './css/auth.module.css';
import { signIn } from '../../../api/auth-api';
import { SigninSchema } from './validationSchema';
import { saveUserData } from '../../../actions/user';
import { ErrorHandling, ErrorContainer } from '../../errors/ErrorsHandling';
import PasswordInput from '../../showPassword/PasswordInput';
import SocialAuthentiation from '../social-auth/SocialAuthentication';

const SignIn = ({ loggedUser, saveUserData }) => {
  if (!loggedUser) {
    return (
      <div>
        <Grid className={style.Auth} centered verticalAlign="middle">
          <Grid.Column className={style.Form} width={14}>
            <Segment raised padded>
              <Header textAlign="center" size="huge">
                {'Sign In'}
                <Header.Subheader size="small" color="grey" className={style.subheader}>
                  {'Connect our website using:'}
                </Header.Subheader>
              </Header>
              <SocialAuthentiation />
              <Divider horizontal>
                <Header as="h4">or</Header>
              </Divider>
              <Formik
                initialValues={{
                  email: '', password: '',
                }}
                validationSchema={SigninSchema}
                onSubmit={(values, actions) => {
                  signIn(values)
                    .then((data) => {
                      saveUserData(data);
                    })
                    .catch((error) => {
                      if (error.response.status === 500) {
                        ErrorHandling('Server is down. Please try again later.');
                      } else {
                        ErrorHandling(error.response.data.message);
                      }
                      actions.setSubmitting(false);
                    });
                }}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  errors,
                  touched,
                  isValid,
                  isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <Input
                      className={touched.email && errors.email ? style.InputError : style.Input}
                      required
                      icon="mail"
                      iconPosition="left"
                      fluid
                      placeholder="Email"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    {touched.email && errors.email && <div className={style.Error}>{touched.email && errors.email}</div>}
                    <PasswordInput
                      className={touched.password && errors.password ? style.InputError : style.Input}
                      touched={touched}
                      name="password"
                      placeholder="Password"
                      errors={errors}
                      value={values.password}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                    />
                    {touched.password && errors.password && <div className={style.Error}>{touched.password && errors.password}</div>}
                    <ErrorContainer />
                    <Button
                      className={style.AuthBtn}
                      fluid
                      size="large"
                      color="black"
                      type="submit"
                      disabled={isSubmitting || !isValid}
                    >
										Sign In
                    </Button>
                    <div className={style.forgotPassword}>
                      <Link to="/auth/forgot-password/">Forgot Password?</Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </Segment>
            <Message className={style.Message}>
              New to us?
              <Link to="/auth/signup/"> Sign Up</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
  return <Redirect to="/" />;
};

const mapStateToProps = ({ user }) => ({
  loggedUser: user.loggedUser,
});

const mapDispatchToProps = dispatch => ({
  saveUserData: (data) => {
    dispatch(saveUserData(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);