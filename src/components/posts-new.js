import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
    //the redux-form field object has some pre-defined properties, including .meta.error, input,
    //and so on. The property .meta.touched is one of a bunch of such properties, it returns true
    //if the field has been touched by the user.
  }

  onSubmit(values) {
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;

    //handleSubmit stripped off of redux-form connected component

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field label="Title" name="title" component={this.renderField} />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title!';
  }
  if (!values.categories) {
    errors.categories = 'Enter at least one category!';
  }
  if (!values.content) {
    errors.content = 'Enter some content!';
  }
  //if errors empty, form fine to submit; getting empty object makes redux
  //think no erorrs present. If errors has any properties, redux thinks
  //there's an error.
  return errors;
};

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(PostsNew);
