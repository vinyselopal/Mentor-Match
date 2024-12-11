const express = require("express");
const cors = require("cors");
const app = express();
const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  password: "postgres",
  user: "postgres",
  database: "mentor_mentee",
});

(async function () {
  await client.connect();
})();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/questions", async (req, res, next) => {
  const raw_questions = await (
    await client.query(`SELECT questions.name as question, questions.id as question_id, predefined_answers.answer
        FROM questions JOIN predefined_answers
        ON questions.id = predefined_answers.question_id`)
  ).rows;
  const questions = raw_questions.reduce((prev, curr) => {
    if (prev[curr.question]) prev[curr.question].answers.push(curr.answer);
    else
      prev[curr.question] = {
        question_id: curr.question_id,
        answers: [curr.answer],
      };
    return prev;
  }, {});
  console.log("questions", questions);
  res.json(questions);
});

app.post("/mentor_answers", async (req, res, next) => {
  const { mentor_id, response } = req.body;
  console.log("body", req.body);
  const db_response = await client.query(
    `INSERT INTO mentor_answers
    (answer, question_id, mentor_id, score)
    VALUES
    (${response.answer},
    ${response.question_id},
    ${mentor_id},
    ${response.score});`
  );
  res.json(1);
});

app.post("/mentee_answers", async (req, res, next) => {
  const mentee_response = req.body;

  const response = await client.query(`
    INSERT INTO mentee_answers
    (answer, question_id, mentee_id)
    VALUES
    (${mentee_response.answer},
    ${mentee_response.question_id},
    ${mentee_response.mentee_id});`);
});

app.listen(3000, () => console.log("Server listening"));
