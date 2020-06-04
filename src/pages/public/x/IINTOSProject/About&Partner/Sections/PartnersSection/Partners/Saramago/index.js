import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import saramagoImage from '~/assets/images/Saramago.jpg';

import styles from '~/assets/jss/Views/partnersSection';

const useStyles = makeStyles(styles);
export default function About() {
  const classes = useStyles();

  return (
    <div>
      <a href="http://aejs.pt/site/">
        <h1>Group of Schools José Saramago</h1>
        <img src={saramagoImage} width="600" height="200" alt="Saramago" />
      </a>
      <div className={classes.section}>
        <p>
          The{' '}
          <a href="http://www.aejs.pt/home/">Group of Schools José Saramago</a>{' '}
          with about 736 students is inserted in the territory belonging to the
          Municipality of Palmela, Setúbal District (about 40 KM, south of
          Lisbon). It is integrated in an Educational Territory of Priority
          Intervention (ETPI) project since 2009.
        </p>
        <p>
          This is a national project that includes school in a problematic socio
          cultural context and a contract between the school and the Ministry of
          Education is drawn. The school presents a project with a set of
          educational goals, and respective pedagogical measures, especially to
          reduce de school failure; the early dropout and indiscipline. The
          project and the respective budget are negotiated with the Ministry of
          Education.
        </p>
        <p>
          Under this ETPI project the school has identified four areas of
          intervention in which teachers work.
        </p>
        <ul>
          <li>
            Improving student learning through the development of measures to
            support and diverse student learning difficulties in particular
            developing some team teaching lessons
          </li>
          <li>
            Prevention of early withdrawal and prevention of indiscipline
            creating the office of student support, study rooms and a system of
            tutors
          </li>
          <li>
            Improved internal organization in order to create conditions
            supportive and feasible of the measures adopted
          </li>
          <li>
            Improved relationships with families by facilitating the
            dissemination and contact with families about the work and projects
            that their children perform in school
          </li>
          <li>
            Development of training initiatives in order to empower teachers to
            ongoing measures. Some of the measures ongoing are:
            <ul>
              <li>
                Students Support Team – SST which Aim to reduce and prevent the
                indiscipline, abandon and the absenteeism.
              </li>
              <li>
                Tutoring - students identified by the class council. Attribution
                mentoring, preferably according to the profile and needs of the
                student - tutors bag.
              </li>
            </ul>
          </li>
        </ul>
        <p>
          Alternative Curricular Paths (PCA) which aims at responding to the
          needs of a group of students who can’t acquire the basic skills within
          the regular education system.
        </p>
        <p>
          A Museum for the Future, a project that allies art education and
          activities of scientific nature. Its target group is students with
          learning difficulties associated with significant emotional disorders.
        </p>
      </div>
    </div>
  );
}
