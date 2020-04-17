import React, { useState, useMemo } from 'react';
import { withRouter, useLocation } from 'react-router-dom';
import { isBefore, format } from 'date-fns';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { toast } from 'react-toastify';
import DoneIcon from '@material-ui/icons/Done';
import NotDoneIcon from '@material-ui/icons/Clear';

import api from '~/services/api';
import { Container, ContainerWrap, ButtonContainer } from './styles';
import Button from '~/components/Button';
import FormModal from './Form';
import MobilityStepsModal from './MobilityStepsModal';

import DeleteModal from '../Delete';
import FileList from '~/components/FileList';
import EmptyMessage from '~/components/EmptyMessage';

import validationSchema from '~/validations/activity';

const allColumns = [
  { id: 'title', label: 'Title', minWidth: 200 },
  { id: 'startDate', label: 'Start Date', minWidth: 120 },
  { id: 'endDate', label: 'End Date', minWidth: 120 },
  { id: 'professorsStr', label: 'Teachers', minWidth: 150 },
  { id: 'studentsStr', label: 'Students', minWidth: 150 },
  {
    id: 'files',
    label: 'Files',
    minWidth: 120,
  },
  {
    id: 'done', // trocar
    label: 'Done',
  },
  {
    id: 'see',
    label: '',
    align: 'center',
    minWidth: 50,
  },
  {
    id: 'delete',
    label: '',
    align: 'center',
    minWidth: 50,
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: window.innerHeight - 270,
  },
});

const Activities = ({ isProfessor, isParticipant, isProject }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [activities, setActivities] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});
  const [error, setError] = useState(false);

  const columns = useMemo(
    () =>
      isProject
        ? allColumns
        : allColumns
            .filter(({ id }) => id !== 'studentsStr')
            .map(column =>
              column.id === 'professorsStr'
                ? { ...column, label: 'Participants' }
                : column
            ),
    [isProject]
  );

  const location = useLocation();
  const [users, setUsers] = useState({
    professors: [],
    students: [],
  });

  const [steps, setSteps] = useState({
    1: { title: 'Look for a partner on the platform', checked: false },
    2: {
      title: 'Analyse curricula and find out what you can share',
      checked: false,
    },
    3: { title: 'Search for financing', checked: false },
    4: {
      title: 'Virtual exchange with colleagues to plan activities',
      checked: false,
    },
    5: { title: 'Student selection', checked: false },
    6: { title: 'Virtual introduction of students', checked: false },
    7: { title: 'Virtual activities before the exchange', checked: false },
    8: { title: 'Mobility', checked: false },
  });

  const handleToggle = ({ target }) => {
    const x = steps[target.name];
    x.checked = target.checked;
    setSteps(x);
  };

  const projectId = useMemo(() => location.pathname.split('/')[3], [
    location.pathname,
  ]);

  const fetchUsers = async () => {
    const response = await api.get(`projects/${projectId}/users`);
    const professors = response.data?.professors.map(({ id, professor }) => ({
      id: professor.id,
      name: professor.name,
    }));

    const students = response.data?.students.map(({ id, studentName }) => ({
      id,
      name: studentName,
    }));

    setUsers({ professors, students });
  };

  // opens the modal
  const handleMobilitySteps = async () => {
    setModalParams({
      onSubmit: handleCreateMobilityStep,
      submitText: 'Create',
      handleToggle,
      steps,
      users,
    });

    setModalOpen('step');
  };

  // gets all the project's activities
  const fetchActivities = async () => {
    const response = await api.get(`projects/${projectId}/activities`);

    if (response.data) {
      const formattedActivities = response.data.map(activity => ({
        ...activity,
        isBeforeToday: isBefore(new Date(activity.endDate), new Date()),
        endDate: activity.endDate
          ? format(new Date(activity.endDate), 'yyyy-MM-dd')
          : '',
        startDate: activity.startDate
          ? format(new Date(activity.startDate), 'yyyy-MM-dd')
          : '',
      }));
      if (formattedActivities.length === 0) {
        setError(true);
      } else {
        setError(false);
      }

      setActivities(formattedActivities);

      if (isProject) {
        if (formattedActivities.length === 0 && !isProfessor && isParticipant) {
          handleMobilitySteps();
        }
      }
    }
  };
  // makes the api call
  const handleCreateMobilityStep = async () => {
    const list = [];

    const response = await api.get(`projects/${projectId}`);
    const project = response.data;

    try {
      for (let i = 1; i < 9; i++) {
        if (steps[i].checked) {
          const activity = {
            title: steps[i].title,
            description: '',
            done: project.done,
            startDate: project.startDate,
            endDate: project.startDate,
            projectId,
          };
          list.push(activity);
        }
      }
      await api.post(`allActivities`, list);

      setModalOpen(false);
      toast.success('Activity created with success!');
      fetchActivities();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
    /*
		try {
      await api.post(`activities`, { ...values, projectId });
      setModalOpen(false);
      toast.success('Activity created with success!');
      fetchActivities();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    } */
  };

  useState(() => {
    fetchActivities();
    fetchUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUpdateDone = async (activityId, values) => {
    const professors = values.professors.map(elem => elem.id);

    const activity = {
      title: values.title,
      description: values.description,
      done: !values.done,
      startDate: values.startDate,
      endDate: values.startDate,
      projectId,
      students: values.students,
      professors,
    };

    try {
      const files = values.files?.filter(f => f).map(({ id }) => id);
      await api.put(`activities/${activityId}`, { ...activity, files });
      setModalOpen(false);
      toast.success('Activity updated with success!');
      fetchActivities();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  // api call to post
  const handleUpdate = async (id, values) => {
    try {
      const activity = {
        title: values.title,
        description: values.description,
        done: values.done,
        startDate: values.startDate,
        endDate: values.startDate,
        projectId,
        students: values.students,
        professors: values.professors,
      };
      console.log('values');
      console.log(values);

      const files = values.files?.filter(f => f).map(({ id }) => id);
      await api.put(`activities/${id}`, { ...activity, files });
      setModalOpen(false);
      toast.success('Activity updated with success!');
      fetchActivities();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  const handleCreate = async values => {
    try {
      const files = values.files?.filter(f => f).map(({ id }) => id);
      await api.post(`activities`, { ...values, projectId, files });
      setModalOpen(false);
      toast.success('Activity created with success!');
      fetchActivities();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  // api call to delete
  const handleDelete = async id => {
    try {
      await api.delete(`activities/${id}`);
      setModalOpen(false);
      toast.success('Activity deleted with success!');
      fetchActivities();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid request, try again');
    }
  };

  const handleDeleteRow = row => {
    setModalParams({
      initialValues: row,
      validationSchema,
      onSubmit: () => handleDelete(row.id),
      submitText: 'Save',
      modalTitle: 'Are you sure you want to delete this activity?',
    });

    setModalOpen('delete');
  };

  const handleCreateActivity = () => {
    setModalParams({
      validationSchema,
      onSubmit: handleCreate,
      submitText: 'Create',
      modalTitle: 'Create a new Activity',
      users,
    });

    setModalOpen('form');
  };

  // opens the update modal and initializes with the activity values
  const handleDetailRow = row => {
    const formattedRow = {
      ...row,
      files: [...row.files, ''],
      students: row.students.length
        ? row.students.map(({ id }) => id)
        : [undefined],
      professors: row.professors.length
        ? row.professors.map(({ id }) => id)
        : [undefined],
    };
    // console.log('Row');
    // console.log(row);

    setModalParams({
      initialValues: formattedRow,
      validationSchema,
      onSubmit: values => handleUpdate(row.id, values),
      submitText: 'Save',
      modalTitle: 'Activity',
      users,
    });

    setModalOpen('form');
  };

  const getRowContent = ({ column, row }) => {
    const value = row[column.id];

    if (column.id === 'delete' && !isProfessor && isParticipant) {
      return (
        <DeleteIcon
          style={{ color: '#cb1010', cursor: 'pointer' }}
          onClick={() => handleDeleteRow(row)}
        />
      );
    }

    if (column.id === 'see' && !isProfessor && isParticipant) {
      return (
        <EditIcon
          style={{ color: 'rgb(11, 31, 63)', cursor: 'pointer' }}
          onClick={() => handleDetailRow(row)}
        />
      );
    }
    if (column.id === 'done') {
      let x = '';
      const f = '';
      if (!isProfessor && isParticipant) {
        x = 'pointer';
      }
      return value ? (
        <DoneIcon
          style={{ color: '#00961e', cursor: x }}
          onClick={() =>
            !isProfessor && isParticipant ? handleUpdateDone(row.id, row) : null
          }
        />
      ) : (
        <NotDoneIcon
          style={{ color: '#cb1010', cursor: x }}
          onClick={() =>
            !isProfessor && isParticipant ? handleUpdateDone(row.id, row) : null
          }
        />
      );
    }

    if (column.id === 'files') {
      if (value.length) return value.length ? <FileList files={value} /> : '';
    }

    return column.format &&
      (typeof value === 'number' || typeof value === 'object')
      ? column.format(value)
      : value;
  };

  return (
    <Container>
      <ContainerWrap>
        <span>
          <h1>Activities</h1>

          {!isProfessor && isParticipant && (
            <ButtonContainer>
              <Button
                title="Create Activity"
                type="button"
                onClick={handleCreateActivity}
              />
              <Button
                title="Steps of Mobility"
                type="button"
                onClick={handleMobilitySteps}
              />
            </ButtonContainer>
          )}
        </span>
        {error && <EmptyMessage />}
        {!error && (
          <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map(column => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activities
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns.map(column => {
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {getRowContent({ column, row })}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={activities.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        )}
      </ContainerWrap>
      <FormModal
        open={modalOpen === 'form'}
        setOpen={setModalOpen}
        isProject={isProject}
        {...modalParams}
      />
      <MobilityStepsModal
        open={modalOpen === 'step'}
        setOpen={setModalOpen}
        {...modalParams}
      />
      <DeleteModal
        open={modalOpen === 'delete'}
        setOpen={setModalOpen}
        {...modalParams}
      />
    </Container>
  );
};

export default withRouter(Activities);
