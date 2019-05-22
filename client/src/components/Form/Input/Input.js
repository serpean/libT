import React from 'react';

import './Input.css';

const input = props => {
  let inputElement = null;
  switch (props.control) {
    case 'input':
      inputElement = (
        <input
          className={[
            !props.valid ? 'invalid' : 'valid',
            props.touched ? 'touched' : 'untouched'
          ].join(' ')}
          type={props.type}
          name={props.name}
          id={props.id}
          required={props.required}
          value={props.value}
          placeholder={props.placeholder}
          onChange={e =>
            props.onChange(props.id, e.target.value, e.target.files)
          }
          onClick={props.onClick}
          onBlur={props.onBlur}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={[
            !props.valid ? 'invalid' : 'valid',
            props.touched ? 'touched' : 'untouched'
          ].join(' ')}
          id={props.id}
          rows={props.rows}
          required={props.required}
          value={props.value}
          onChange={e => props.onChange(props.id, e.target.value)}
          onBlur={props.onBlur}
        />
      );
      break;
    case 'checkbox':
    case 'radio':
      inputElement = (
        <input
          className={[
            'line',
            !props.valid ? 'invalid' : 'valid',
            props.touched ? 'touched' : 'untouched'
          ].join(' ')}
          type={props.type}
          name={props.name}
          id={props.id}
          checked={props.value}
          required={props.required}
          value={props.value}
          placeholder={props.placeholder}
          onChange={e =>
            props.onChange(props.name, e.target.value, e.target.files)
          }
          onBlur={props.onBlur}
        />
      );
      break;
    default:
      break;
  }
  return (
    <div className="input">
      {props.label && (
        <label
          htmlFor={props.id}
          className={
            props.control === 'radio' || props.control === 'checkbox'
              ? 'line'
              : null
          }
        >
          {props.label}
        </label>
      )}
      {inputElement}
    </div>
  );
};

export default input;
