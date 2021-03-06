import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useFormik } from 'formik';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import Button from '~/components/Button';
import Select from '~/components/Select';
import Input from '~/components/Input';
import Checkbox from '~/components/Checkbox';
import { Form } from './styles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
    maxHeight: '85%',
    overflowY: 'auto',
    padding: theme.spacing(2, 4, 3),
  },
}));

export default ({
  initialValues = { startDate: new Date(), endDate: new Date() },
  submitText,
  open,
  setOpen,
  modalTitle,
  onSubmit,
  validationSchema,
  isProject,
}) => {
  if (!open) {
    return null;
  }

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    setOpen(false);
  };

  // Form controller
  const formik = useFormik({
    validationSchema,
    initialValues,
    onSubmit,
  });

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">{modalTitle}</h2>
        <div id="simple-modal-description">
          <Form onSubmit={formik.handleSubmit}>
            <Input
              label="Title"
              type="text"
              placeholder={`Type the ${isProject ? 'project' : 'output'} title`}
              name="title"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
            />
            {isProject && (
              <Input
                label="Goal"
                type="text"
                placeholder="Type the project goal"
                name="goal"
                onChange={formik.handleChange}
                values={formik.values}
                errors={formik.errors}
                touched={formik.touched}
                submitted={formik.submitCount}
              />
            )}

            <Input
              label="Description"
              type="text"
              textarea
              placeholder={`Tell more about this ${
                isProject ? 'project' : 'output'
              }`}
              name="description"
              onChange={formik.handleChange}
              values={formik.values}
              errors={formik.errors}
              touched={formik.touched}
              submitted={formik.submitCount}
            />
            {isProject && (
              <>
                <Input
                  label="Links"
                  type="text"
                  placeholder="links"
                  name="links"
                  onChange={formik.handleChange}
                  values={formik.values}
                  errors={formik.errors}
                  touched={formik.touched}
                  submitted={formik.submitCount}
                />
                <span>
                  <Input
                    label="Age Start"
                    type="number"
                    placeholder="Age Range Start"
                    name="ageRangeStart"
                    onChange={formik.handleChange}
                    values={formik.values}
                    errors={formik.errors}
                    touched={formik.touched}
                    submitted={formik.submitCount}
                  />
                  <Input
                    label="Age End"
                    type="ageRangeEnd"
                    placeholder="Age Range End"
                    name="ageRangeEnd"
                    onChange={formik.handleChange}
                    values={formik.values}
                    errors={formik.errors}
                    touched={formik.touched}
                    submitted={formik.submitCount}
                  />
                </span>
                <Select
                  label="Mobility Type"
                  type="type"
                  placeholder="What's the mobility type?"
                  name="type"
                  onChange={formik.handleChange}
                  values={formik.values}
                  errors={formik.errors}
                  touched={formik.touched}
                  submitted={formik.submitCount}
                  options={[
                    { id: 'Virtual', name: 'Virtual' },
                    { id: 'In Presence', name: 'In Presence' },
                  ]}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    disableToolbar
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="date-picker-inline"
                    name="StartDate"
                    label="Start date"
                    value={formik?.values?.startDate}
                    onChange={event => formik.setFieldValue('startDate', event)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                  <KeyboardDatePicker
                    autoOk
                    disableToolbar
                    variant="inline"
                    format="yyyy-MM-dd"
                    margin="normal"
                    id="date-picker-inline"
                    name="endDate"
                    label="Limit date"
                    value={formik?.values?.endDate}
                    onChange={event => formik.setFieldValue('endDate', event)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                <Checkbox
                  label="Campaing"
                  type="text"
                  name="campaing"
                  onChange={formik.handleChange}
                  values={formik.values}
                  errors={formik.errors}
                  touched={formik.touched}
                  submitted={formik.submitCount}
                />
                <Input
                  label="Reference Contact"
                  type="text"
                  placeholder="Reference Contact"
                  name="referenceEmail"
                  onChange={formik.handleChange}
                  values={formik.values}
                  errors={formik.errors}
                  touched={formik.touched}
                  submitted={formik.submitCount}
                />
              </>
            )}
            <Button title={submitText} type="submit" />
          </Form>
        </div>
      </div>
    </Modal>
  );
};
