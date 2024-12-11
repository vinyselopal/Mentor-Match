(async () => {
  const questionsList = document.getElementById("questions_list");
  document
    .getElementById("submit_button")
    .addEventListener("click", async (event) => {
      const body = {
        mentor_id: 1,
      };
      const children = questionsList.children;
      [...children].forEach((q) => {
        console.log("id", q.id);
        body.response = {
          question_id: q.id,
          answer: q.querySelector("select")[0].value,
          score: q.querySelector("select")[1].value,
        };
      });
      const res = await fetch("http://localhost:3000/mentor_answers", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

  const res = await fetch("http://localhost:3000/questions", {
    method: "GET",
  });
  console.log("res", res);
  const body = await res.json();

  console.log("body", body);
  let innerHTML = ``;
  Object.keys(body).forEach((q) => {
    innerHTML += `
                <li id=${body[q].question_id}>
                    <p>${q}</p>
                    <select>
                        ${body[q].answers
                          .map((a) => `<option>${a}</option>`)
                          .join("")}
                    </select>
                    <select>
                        ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                          .map((n) => `<option>${n}</option>`)
                          .join("")}
                    </select>
                </li>
            `;
  });
  console.log("inner html", innerHTML);
  questionsList.innerHTML = innerHTML;
})();
