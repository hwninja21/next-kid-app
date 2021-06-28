import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from '~/i18n';
import { useText } from '~/theme/common';
import useStyles from './result-style';
import { useDispatch, useSelector } from "react-redux";
import { get_activity_result_by_user } from '../../store/actions/main';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Container, TablePagination, TableFooter } from '@material-ui/core';

function ResultTable(props) {
  const classes = useStyles();
  const text = useText();
  const { t } = props;
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const actResult = useSelector(state => state.main.data.actResult);
  const token = useSelector(state => state.main.auth.token);
  const dispatch = useDispatch();

  if (actResult === null) {
    if (token) {
        dispatch(get_activity_result_by_user({studentid: token._id}));
    }
    return null;
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{minWidth: 300}}>Activity</TableCell>
                        <TableCell align="right">Questions</TableCell>
                        <TableCell align="right">Correct Answers</TableCell>
                        <TableCell align="right">Start Time</TableCell>
                        <TableCell align="right">End Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? actResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : actResult
                    ).map(row => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                            {row.activity_name}
                            </TableCell>
                            <TableCell align="right">{row.questions}</TableCell>
                            <TableCell align="right">{row.correct_answers}</TableCell>
                            <TableCell align="right">{new Date(row.start_time).toLocaleString()}</TableCell>
                            <TableCell align="right">{new Date(row.end_time).toLocaleString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1}]}
                            colSpan={3}
                            count={actResult.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    </Container>
  );
}

ResultTable.propTypes = {
  t: PropTypes.func.isRequired
};

export default withTranslation(['hosting-landing'])(ResultTable);
