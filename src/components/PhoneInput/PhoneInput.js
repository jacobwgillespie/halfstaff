import { PhoneNumberUtil } from 'google-libphonenumber/dist/libphonenumber';
import InputMask from 'react-input-mask';
import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const phoneUtil = PhoneNumberUtil.getInstance();

const validNumber = number => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parse(number, 'US'));
  } catch (e) {
    return false;
  }
};

export default class PhoneInput extends Component {
  static propTypes = {
    defaultValue: PropTypes.any,
    name: PropTypes.string,
    onValidation: PropTypes.func,
    showValidation: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      valid: props.defaultValue ? validNumber(props.defaultValue) : false,
    };
  }

  componentWillMount() {
    const { onValidation } = this.props;
    const { valid } = this.state;

    if (onValidation) onValidation(valid);
  }

  onChange = e => {
    const { onValidation } = this.props;
    const valid = validNumber(e.target.value);

    if (valid !== this.state.valid) {
      this.setState({ valid });
      onValidation(valid);
    }
  }

  render() {
    const { defaultValue, name, showValidation } = this.props;
    const { valid } = this.state;
    const errorText = !valid && showValidation
      ? 'Please enter a valid phone number'
      : null;

    return (
      <TextField
        defaultValue={defaultValue}
        errorText={errorText}
        floatingLabelFixed
        floatingLabelText="Phone Number"
        id="phone"
        onChange={this.onChange}
      >
        <InputMask
          mask="999-999-9999"
          maskChar={null}
          name={name}
        />
      </TextField>
    );
  }
}
