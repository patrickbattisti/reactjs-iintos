import React from 'react';

import { Container } from './styles';

export default function FileInput({
  label,
  touched,
  name,
  errors,
  placeholder,
  onChange,
  submitted,
}) {
  return (
    <Container>
      {label && (
        <span>
          <label>{label}</label>
          {submitted || (touched[name] && errors[name]) ? (
            <p>{errors[name]}</p>
          ) : null}
        </span>
      )}

      <div>
        <p>{placeholder}</p>
        <input type="file" name={name} onChange={onChange} />
      </div>
    </Container>
  );
}
