import { useEffect, useState } from "react";
import { getAnswerByUserId } from "../../services/answersService";
import { getListTopic } from "../../services/topicService";
import { Link } from "react-router-dom";

function Answers() {
  const [dataAnswers, setDataAnswers] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const answerByUserId = await getAnswerByUserId();
      const topics = await getListTopic();

      let result = [];

      for (let i = 0; i < answerByUserId.length; i++) {
        result.push({
          ...answerByUserId[i],
          ...topics.find((item) => item.id === answerByUserId[i].topicId),
          id: answerByUserId[i].id,
        });
      }

      setDataAnswers(result);
    };
    fetchApi();
  }, []);

  console.log(dataAnswers);

  return (
    <>
      <h2>Danh sách bài đã luyện tập</h2>

      {dataAnswers.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên chủ đề</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataAnswers.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <Link to={`/result/${item.id}`}>
                    <button className="button">Xem chi tiết</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Answers;