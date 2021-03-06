import React, { useState, useEffect } from 'react';
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
import { toast } from 'react-toastify';

import api from '~/services/api';
import { Container, ContainerWrap } from '~/styles/Sidebar';
import Button from '~/components/Button';
import FormModal from './modals/Form';
import EmptyMessage from '~/components/EmptyMessage';

import validationSchema from '~/validations/user';
import Search from '~/components/Search';

const columns = [
  { id: 'name', label: 'Name', minWidth: 200 },
  { id: 'email', label: 'E-mail', minWidth: 150 },
  {
    id: 'school',
    label: 'School',
    minWidth: 200,
  },
  {
    id: 'active',
    label: 'Active',
    minWidth: 100,
    format: value => (value ? 'Yes' : 'No'),
  },
  {
    id: 'role',
    label: 'Role',
    minWidth: 100,
    format: value => value.toFixed(2),
  },
  {
    id: 'see',
    label: '',
    align: 'center',
    minWidth: 50,
    format: value => value.toFixed(2),
  },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: window.innerHeight - 300,
  },
});

export default function Users({ isCoordinator }) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [schools, setSchools] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalParams, setModalParams] = useState({});
  const [error, setError] = useState();
  const [displayUser, setDiplayUser] = useState([]);

  const fetchUsers = async () => {
    const response = await api.get('users');
    setUsers(response.data);
    setDiplayUser(response.data);

    if (response.data.length === 0) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const fetchRoles = async () => {
    const response = await api.get('roles');
    setRoles(response.data);
  };

  const fetchSchools = async () => {
    const response = await api.get('schools');
    setSchools(response.data);
  };

  useEffect(() => {
    fetchRoles();
    fetchSchools();
  }, []);

  useState(() => {
    fetchUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // api call to post
  const handleUpdate = async (id, values) => {
    try {
      await api.put(`users/${id}`, values);
      setModalOpen(false);
      toast.success('User updated with success!');
      fetchUsers();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  const handleCreate = async user => {
    try {
      await api.post('users', {
        user,
        school: { schoolId: user.schoolId },
      });
      setModalOpen(false);
      toast.success('User created with success!');
      fetchUsers();
    } catch (e) {
      toast.error(e?.response?.data?.error || 'Invalid data, try again');
    }
  };

  const handleCreateUser = () => {
    setModalParams({
      initialValues: {},
      validationSchema,
      onSubmit: handleCreate,
      submitText: 'Create',
      modalTitle: 'Create a new User',
    });

    setModalOpen('form');
  };

  const handleDetailRow = row => {
    setModalParams({
      initialValues: row,
      validationSchema,
      onSubmit: values => handleUpdate(row.id, values),
      submitText: 'Save',
      modalTitle: 'User',
    });

    setModalOpen('form');
  };

  const getRowContent = ({ column, row }) => {
    const value = row[column.id];

    if (column.id === 'see' && isCoordinator) {
      return (
        <EditIcon
          style={{ color: '#3F51B5', cursor: 'pointer' }}
          onClick={() => handleDetailRow(row)}
        />
      );
    }

    return column.format &&
      (typeof value === 'number' || typeof value === 'boolean')
      ? column.format(value)
      : value;
  };

  return (
    <Container>
      <ContainerWrap>
        <span>
          <h1>Users</h1>

          <span>
            <Search
              setDisplay={setDiplayUser}
              displayOg={users}
              placeholder="Search by name"
            />

            {isCoordinator && (
              <Button
                title="Create User"
                type="button"
                onClick={handleCreateUser}
              />
            )}
          </span>
        </span>
        {error === true && <EmptyMessage />}
        {error === false && (
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
                  {displayUser
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
              count={users.length}
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
        schools={schools}
        roles={roles}
        setOpen={setModalOpen}
        {...modalParams}
      />
    </Container>
  );
}
