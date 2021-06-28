import React, { useState, useEffect } from 'react';
import { Container, Button, FormControl, FormGroup, FormControlLabel, Checkbox} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useTheme } from '@material-ui/core/styles';
import _ from '~/@lodash';
import useStyles from './style';
import api from '~/config/ApiConfig';

function MathComponent(props) {
  const classes = useStyles();
  const theme = useTheme();

  const { params } = props;
  const [values, setValue] = useState({
    page: 1,
    data: [],
    answer: {}
  });

  useEffect(() => {
    api.post('/data/get-activity-param-json', {url: params.data}).then((res) => {
      var doc = res.data.doc;
      var resData = [];
      doc.map((cur) => {
        resData.push({
          ...cur,
          result: -1,
          answer: {}
        })
      })

      var newQuiz = resData[0];
      var answer = {};
      newQuiz.answers.map((cur) => {
        answer = {
          ...answer,
          [cur.aid + cur.value] : false
        };
      })
      
      setValue({...values, data: resData, answer: answer});
    })
  }, []);

  var canSubmit = values.data.length > 0 ? values.data[params.perpage * (values.page - 1)].result : -1;
  var pages = values.data.length > 0 ? Math.floor(values.data.length / params.perpage) + (values.data.length % params.perpage > 0) : 0;
  var loopArr = [];
  for (var i = (values.page - 1) * params.perpage ; i < values.data.length && i < values.page * params.perpage ; i ++) {
    loopArr.push(i);
  }

  const checkResult = () => {
    var totalRes = 0;
    var data = values.data;
    loopArr.map((idx) => {
      var flag = 1;
      var quiz = data[idx];
      quiz.answers.forEach((cur) => {
        var idx = quiz.right_answers.indexOf(cur.aid);
        if ((idx === -1 && values.answer[cur.aid + cur.value] === true) || (idx !== -1 && values.answer[cur.aid + cur.value] !== true))
          flag = 0;
      })

      data[idx].result = flag;
      data[idx].answer = values.answer;
      totalRes += flag;
    })

    setValue({...values, data: data});

    return totalRes;
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();

    if (values.page <= values.data.length) {
      var chRes = checkResult();

      var newPage = values.page + 1;
      var questions = params.questions;
      var flag = true;
      if (newPage > pages) {
        newPage = pages;
        questions = values.data.length % params.perpage;
        flag = false;
      }

      props.handeSubmitAnswer(questions, chRes);
      setValue({...values, page: newPage});

      if (flag) {
        var newloopArr = [];
        for (var i = (newPage - 1) * params.perpage ; i < values.data.length && i < newPage * params.perpage ; i ++) {
          newloopArr.push(i);
        }
    
        var answer = {};
        newloopArr.map((idx) => {
          var newQuiz = values.data[idx];
          if (newQuiz.result === -1) {
            newQuiz.answers.map((cur) => {
              answer = {
                ...answer,
                [cur.aid + cur.value] : false
              };
            })
          }
          else {
            answer = {
              ...answer,
              ...newQuiz.answer
            };
          }
        })
        setValue({...values, answer: answer});  
      }
    }
  }

  const handleChangePage = (ev, newPage) => {
    var newloopArr = [];
    for (var i = (newPage - 1) * params.perpage ; i < values.data.length && i < newPage * params.perpage ; i ++) {
      newloopArr.push(i);
    }

    var answer = {};
    newloopArr.map((idx) => {
      var newQuiz = values.data[idx];
      if (newQuiz.result === -1) {
        newQuiz.answers.map((cur) => {
          answer = {
            ...answer,
            [cur.aid + cur.value] : false
          };
        })
      }
      else {
        answer = {
          ...answer,
          ...newQuiz.answer
        };
      }
    })

    setValue({...values, page: newPage, answer: answer});
  }

  const handleCheckChange = name => event => {
    var answer = values.answer;
    answer[name] = event.target.checked;
    setValue({...values, answer: answer});
  }

  const renderAnswerContent = (quiz) => {
    if (quiz === null) {
      return (<div></div>);
    }
    return (
      <div>
        <FormControl component="fieldset" className={classes.formControl} fullWidth>
          <FormGroup>
          {quiz.answers.map((cur) => (
            <FormControlLabel
              control={<Checkbox checked={values.answer[cur.aid + cur.value] ? values.answer[cur.aid + cur.value] : false} onChange={handleCheckChange(cur.aid + cur.value)} value={cur.aid + cur.value} />}
              label={cur.value}
              key={cur.aid}
            />
          ))}
          </FormGroup>
        </FormControl>
      </div>
    )
  }

  const handleClear = (ev) => {
    ev.preventDefault();
    setValue({...values, answer: {}});
  }

  return (
    <div className={classes.content}>
      {loopArr.map((idx) => {
        var quiz = values.data[idx];
        return (
          <div key={idx}>
          {quiz &&
            <Container maxWidth="lg" style={{textAlign: 'left'}}>
              <h2>{quiz.value}
              {quiz.result === 1 && <img className={classes.tickImage} alt="green-tick" src="/static/images/green-tick.png" />}
              {quiz.result === 0 && <img className={classes.tickImage} alt="green-tick" src="/static/images/red-x.png" />}
              </h2>
            </Container>
          }
    
          {renderAnswerContent(quiz)}
          </div>
        )
      })}

      {canSubmit === -1 &&
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
