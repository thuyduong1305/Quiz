/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicService";
import { getAnswer } from "../../services/answersService";
import { getListQuestion } from "../../services/questionsService";
import "./Result.scss";

function Result() {
  const params = useParams();
  const [dataResult, setDataResult] = useState([]);
  const [dataTopic, setDataTopic] = useState();
  const [info, setInfo] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const dataAnswers = await getAnswer(params.id);
      const dataQuestions = await getListQuestion(dataAnswers.topicId);

      let result = [];

      for (let i = 0; i < dataQuestions.length; i++) {
        result.push({
          ...dataQuestions[i],
          ...dataAnswers.answers.find(
            (item) => item.questionId === dataQuestions[i].id
          ),
        });
      }
      
      setDataResult(result);

      const infoTopic = await getTopic(dataAnswers.topicId);
      setDataTopic(infoTopic);

      let countAnswerTrue = 0;
      for(const item of result) {
        if(item.answer === item.correctAnswer) {
          countAnswerTrue += 1;
        }
      }

      let info = {
        countAnswerTrue: countAnswerTrue,
        totalAnswer: result.length
      };

      setInfo(info);
    };
    fetchApi();
  }, []);

  return (
    <>
      {dataTopic && <h2>Kết quả chủ đề: {dataTopic.name}</h2>}

      {info && (
        <div>
          <span>Đúng: <strong>{info.countAnswerTrue}</strong></span>
          <span> | Sai: <strong>{info.totalAnswer - info.countAnswerTrue}</strong></span>
          <span> | Tổng số câu: <strong>{info.totalAnswer}</strong></span>
          <span> | Tỷ lệ đúng: <strong>{info.countAnswerTrue / info.totalAnswer * 100}%</strong></span>
        </div>
      )}

      {dataResult.length > 0 && (
        <div className="result">
          {dataResult.map((item, i) => (
            <div className="result__item" key={item.id}>
              <p>
                Câu {i + 1}: {item.question}
                {item.correctAnswer === item.answer ? (
                  <span className="result__tag result__tag--true">Đúng</span>
                ) : (
                  <span className="result__tag result__tag--false">Sai</span>
                )}
              </p>

              {item.answers.map((answer, index) => {
                let className = "";
                let checked = false;

                if (item.answer === index) {
                  checked = true;
                  className = "result__item--selected";
                }

                if (item.correctAnswer === index) {
                  className += " result__item--result";
                }

                return (
                  <div key={index}>
                    <input type="radio" checked={checked} disabled />
                    <label className={className}>{answer}</label>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}

      {dataTopic && (
        <Link to={"/quiz/" + dataTopic.id}>
          <button className="button">Làm lại</button>
        </Link>
      )}
    </>
  )
}

export default Result;