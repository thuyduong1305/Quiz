/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListQuestion } from "../../services/questionsService";
import { getTopic } from "../../services/topicService";
import { getCookie } from "../../helpers/cookie";
import { createAnswer } from "../../services/answersService";

function Quiz() {
  const params = useParams();
  const navigate = useNavigate();
  const [dataTopic, setDataTopic] = useState();
  const [dataQuestions, setDataQuestions] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getTopic(params.id);
      setDataTopic(result);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getListQuestion(params.id);
      setDataQuestions(result);
    };
    fetchApi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let selectedAnswers = [];

    for(let i = 0; i < e.target.elements.length; i++) {
      if(e.target.elements[i].checked === true) {
        const name = e.target.elements[i].name;
        const value = e.target.elements[i].value;
        selectedAnswers.push({
          questionId: parseInt(name),
          answer: parseInt(value)
        });
      }
    }

    const options = {
      userId: parseInt(getCookie("id")),
      topicId: parseInt(params.id),
      answers: selectedAnswers
    };

    const result = await createAnswer(options);
    if(result) {
      navigate(`/result/${result.id}`);
    }
  }

  return (
    <>
      {dataTopic && <h2>Bài Quiz chủ đề: {dataTopic.name}</h2>}

      {dataQuestions.length > 0 && (
        <>
          <form onSubmit={handleSubmit}>
            {dataQuestions.map((item, i) => (
              <div key={item.id}>
                <p>
                  Câu {i + 1}: {item.question}
                </p>

                {item.answers.map((answer, index) => (
                  <div key={index}>
                    <input
                      id={`quiz-${item.id}-${index}`}
                      type="radio"
                      name={item.id}
                      value={index}
                    />
                    <label htmlFor={`quiz-${item.id}-${index}`}>{answer}</label>
                  </div>
                ))}
              </div>
            ))}

            <button>Nộp bài</button>
          </form>
        </>
      )}
    </>
  );
}

export default Quiz;
