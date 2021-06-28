import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Divider, OutlinedInput } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useTheme } from '@material-ui/core/styles';
import _ from '~/@lodash';
import useStyles from './style';

function MathComponent(props) {
  const classes = useStyles();
  const theme = useTheme();

  const { params } = props;
  const [values, setValue] = useState({
    page: 1,
    questionArray: []
  });

  var opChar = ["+", "-", "*", "/"];

  useEffect(() => {
    var arr = [];
    var diff = params.max - params.min;
    for (var i = 0 ; i < params.questions ; i ++) {
      var a = Math.round(Math.random() * diff) + params.min;
      var b = Math.round(Math.random() * diff) + params.min;
      arr.push({
        a: Math.max(a, b),
        b: Math.min(a, b),
        op: params.operator,
        res: -1,
        answer: 0,
      })
    }
    setValue({...values, questionArray: arr});
  }, []);

  var OP = params.operator;
  var pages = Math.floor(params.questions / params.perpage) + (params.questions % params.perpage > 0);
  var res = values.questionArray.length > 0 ? values.questionArray[(values.page - 1) * params.perpage].res : -1;
  var loopArr = [];
  for (var i = (values.page - 1) * params.perpage ; i < params.questions && i < values.page * params.perpage ; i ++) {
    loopArr.push(i);
  }

  const checkResult = () => {
    var newQuestions = values.questionArray;
    var totalres = 0;
    loopArr.map((idx, i) => {
      var inputRes = parseInt(document.getElementById("result" + i).value);
      var result = 0;
      var A = values.questionArray.length > 0 ? values.questionArray[idx].a : 0;
      var B = values.questionArray.length > 0 ? values.questionArray[idx].b : 0;

      switch (OP) {
        case '+':
          result = inputRes === (A + B);
          break;
        case '-':
          result = inputRes === (A - B);
          break;
        case '*':
          result = inputRes === (A * B);
          break;
        case '/':
          result = inputRes === Math.floor(A / B);
          break;
        default:
          break;
      }
      newQuestions[idx].res = result ? 1 : 0;
      newQuestions[idx].answer = inputRes;
      totalres += result;
    })

    setValue({...values, questionArray: newQuestions});

    return totalres;
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();

    var questions = params.perpage;
    var newPage = values.page + 1;
    if (newPage > pages) {
      newPage = values.page;
      questions = params.questions % params.perpage;
    }
    props.handeSubmitAnswer(questions, checkResult());

    setValue({...values, page: newPage});
    for (var i = 0 ; i < params.perpage && params.perpage * (newPage - 1) + i < params.questions ; i ++) {
      document.getElementById("result" + i).value = values.questionArray[params.perpage * (newPage - 1) + i].answer;
    }
}

  const handleChangePage = (ev, newPage) => {
    setValue({...values, page: newPage});
    for (var i = 0 ; i < params.perpage && params.perpage * (newPage - 1) + i < params.questions ; i ++) {
      document.getElementById("result" + i).value = values.questionArray[params.perpage * (newPage - 1) + i].answer;
    }
  }

  const renderMultiplication = () => {
    var res = [];
    var j = 0;
    for (var i = 1 ; i < B ; i *= 10, j ++) {
      res.push(<OutlinedInput key={i} className={classes.numberInput} style={{marginRight: theme.spacing(4 * j)}} id={"result" + i}/>);
    }
    res.push(<Divider className={classes.border} key="divider" />);
    return res;
  }

  const handleClear = (ev) => {
    ev.preventDefault();
    for (var i = 0 ; i < params.perpage && params.perpage * (values.page - 1) + i < params.questions ; i ++) {
      document.getElementById("result" + i).value = "";
    }
  }

  return (
    <div className={classes.content}>
      {loopArr.map((idx, i) => {
        var A = values.questionArray.length > 0 ? values.questionArray[idx].a : 0;
        var B = values.questionArray.length > 0 ? values.questionArray[idx].b : 0;
        var answer = values.questionArray.length > 0 ? values.questionArray[idx].answer : 0;
        var result = values.questionArray.length > 0 ? values.questionArray[idx].res : -1;

        return (
          <Container className={classes.calcContent} key={i}>
            <div style={{padding: theme.spacing(2)}}>
              <Typography className={classes.numberFont}>{A}</Typography>
              <Typography className={classes.numberFont}>{OP} {B}</Typography>
            </div>
            <Divider className={classes.border} />
            {OP === '*' &&
              renderMultiplication()
            }
            <div style={{position: 'relative'}}>
              <OutlinedInput className={classes.numberInput} id={"result" + i}/>
              {result === 1 && <img className={classes.tickImage} alt="green-tick" src="/static/images/green-tick.png" />}
              {result === 0 && <img className={classes.tickImage} alt="green-tick" src="/static/images/red-x.png" />}
            </div>
          </Container>
        )
      })
      }

      {res === -1 &&
        <div>
          <Button size="large" variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
          <Button className={classes.clearButton} size="large" variant="contained" color="secondary" onClick={handleClear}>Clear</Button>          
        </div>
      }

      <Pagination className={classes.paginate} count={pages} page={values.page} onChange={handleChangePage} size="large" />
    </div>
  );
}

export default MathComponent;
